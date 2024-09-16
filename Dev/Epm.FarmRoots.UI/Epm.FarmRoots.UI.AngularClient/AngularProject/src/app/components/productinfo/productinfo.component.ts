import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CreateProduct, ResponseProduct } from '../../models/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductInfoComponent implements OnInit {
  productForm!: FormGroup;
  savedProduct!: ResponseProduct;
  isDataSaved: boolean = false;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.initForm();

    // Check if there is saved product data in local storage
    const savedProductData = localStorage.getItem('savedProduct');
    if (savedProductData) {
      this.savedProduct = JSON.parse(savedProductData);
      this.isDataSaved = true;
      this.fillFormWithSavedData();
    }
  }

  private initForm() {
    this.productForm = new FormGroup({
      productId: new FormControl('Generated After Saving'),
      createdDate: new FormControl('Generated After Saving'),
      updatedDate: new FormControl('Generated After Saving'),
      productType: new FormControl(null, Validators.required),
      published: new FormControl(false),
      productName: new FormControl(null, [
        Validators.required,
        Validators.maxLength(15),
        alphaValidator(),
        noWhiteSpaceValidator()
      ]),
      shortDescription: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      fullDescription: new FormControl(null, [Validators.maxLength(500)]),
      productCondition: new FormControl(null, Validators.required),
      productTags: new FormControl(null, [maxTagsValidator(5)])
    });
  }

  onSubmit() {
    if (this.isDataSaved) {
      alert('Data Already Saved, Click on Edit and Save for doing changes');
      return;
    }

    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const tags = formValue.productTags ? formValue.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [];

      if (tags.length > 5) {
        const productTagsControl = this.productForm.get('productTags');
        if (productTagsControl) {
          productTagsControl.setErrors({ 'maxTagsExceeded': true });
        }
        return;
      }

      console.log("Submitting Product:", this.productForm.value);

      this.productService.createProduct(this.productForm.value as CreateProduct, tags).subscribe(
        (response: any) => {
          this.savedProduct = response;
          console.log(response);
          alert('Data has been saved successfully!');
          this.isDataSaved = true;
          this.fillFormWithSavedData();
        },
        (error: any) => {
          console.error('Failed to save data!', error);
          alert('Failed to save data!' + error);
        }
      );
    } else {
      alert('Please check the form for errors.');
    }
  }

  onEditandSave() {
    if (!this.isDataSaved) {
      alert('Save data before Edit and Save');
      return;
    }

    if (this.productForm.valid) {
      const prodData = this.productForm.value as ResponseProduct;
      prodData.productId = this.savedProduct.productId;
      prodData.createdDate = this.savedProduct.createdDate;
      prodData.updatedDate = this.savedProduct.updatedDate;
      prodData.vendorId = this.savedProduct.vendorId;

      const formValue = this.productForm.value;
      const tags = formValue.productTags ? formValue.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [];

      prodData.productTags = tags;

      console.log(this.savedProduct.productId);

      if (JSON.stringify(prodData) === JSON.stringify(this.savedProduct)) {
        alert('Change Saved Data before Edit and Save');
        return;
      }

      this.productService.updateProduct(this.savedProduct.productId, prodData).subscribe(
        response => {
          alert('Record updated successfully!');
          this.savedProduct = prodData;
          localStorage.setItem('savedProduct', JSON.stringify(this.savedProduct)); // Store the updated product data in local storage
        },
        error => {
          console.error('Update failed!', error);
          alert('Failed to update record!');
        }
      );
    } else {
      alert('Please fill the required details.');
    }
  }

  fillFormWithSavedData() {
    this.productForm.patchValue({
      productId: this.savedProduct.productId,
      createdDate: this.savedProduct.createdDate,
      updatedDate: this.savedProduct.updatedDate,
      productType: this.savedProduct.productType,
      published: this.savedProduct.published,
      productName: this.savedProduct.productName,
      shortDescription: this.savedProduct.shortDescription,
      fullDescription: this.savedProduct.fullDescription,
      productCondition: this.savedProduct.productCondition,
      productTags: this.savedProduct.productTags.join(', ')
    });
  }
}

export function noNumericalValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasNumber = /\d/.test(control.value);
    return hasNumber ? { numericalNotAllowed: true } : null;
  };
}

export function alphaValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = /^[a-zA-Z ]*$/.test(control.value);
    return valid ? null : { 'alphaOnly': { value: control.value } };
  };
}

export function noWhiteSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const hasWhiteSpace = /\s\s+/.test(control.value);
    return hasWhiteSpace ? { 'whiteSpace': { value: control.value } } : null;
  };
}

export function maxTagsValidator(maxTags: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const tags = control.value ? control.value.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [];
    return tags.length > maxTags ? { 'maxTagsExceeded': true } : null;
  };
}
