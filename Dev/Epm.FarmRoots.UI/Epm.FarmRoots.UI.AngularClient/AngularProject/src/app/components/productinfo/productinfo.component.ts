import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CreateProduct, ResponseProduct } from '../../models/product';
import {ProductService } from '../../services/product.service'

@Component({
  selector: 'app-product-info',
  templateUrl: './productinfo.component.html',
  styleUrls: ['./productinfo.component.css']
})
export class ProductInfoComponent implements OnInit {
  
  productForm!: FormGroup;
  savedProduct!: ResponseProduct;
  constructor(private productService: ProductService) {
    
  }

  ngOnInit() {
    this.initForm();
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
        alphaValidator()
      ]),
      shortDescription: new FormControl(null, [Validators.required, Validators.maxLength(50)]),
      fullDescription: new FormControl(null, [Validators.maxLength(500)]),
      productCondition: new FormControl(null, Validators.required),
      productTags: new FormControl(null),
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const tags = formValue.productTags ? formValue.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [];
      // Limit the number of tags to 5
      const limitedTags = tags.slice(0, 5);

      console.log("Submitting Product:", this.productForm.value);
      this.productService.createProduct(this.productForm.value as CreateProduct, limitedTags).subscribe(
        (response: any) => {
          this.savedProduct = response;
          console.log(response);
          alert('Data has been saved successfully!');
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
    if (this.productForm.valid) {
      const prodData = this.productForm.value as ResponseProduct;
      prodData.productId = this.savedProduct.productId;
      prodData.createdDate = this.savedProduct.createdDate;
      prodData.updatedDate = this.savedProduct.updatedDate;
      prodData.vendorId = this.savedProduct.vendorId;
      const formValue = this.productForm.value;
      const tags = formValue.productTags ? formValue.productTags.split(',').map((tag: string) => tag.trim()).filter((tag: string) => tag !== '') : [];
      // Limit the number of tags to 5
      const limitedTags = tags.slice(0, 5);
      prodData.productTags = limitedTags; 
      console.log(this.savedProduct.productId);
      this.productService.updateProduct(this.savedProduct.productId, prodData).subscribe(
        response => {
          alert('Record updated successfully!');
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
