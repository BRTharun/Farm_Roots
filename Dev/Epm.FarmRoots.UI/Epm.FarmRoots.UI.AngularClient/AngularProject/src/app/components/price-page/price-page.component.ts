import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { PriceService } from '../../services/price.service';  
import { Price } from '../../models/price.model';  

@Component({
  selector: 'app-price-page',
  templateUrl: './price-page.component.html',
  styleUrls: ['./price-page.component.css']
})
export class PricePageComponent implements OnInit {
  priceForm!: FormGroup;
  savedPriceData!: Price;
  constructor(private priceService: PriceService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    this.priceForm = new FormGroup({
      salePrice: new FormControl(null, [Validators.required, Validators.min(0)]),
      mrp: new FormControl(null, [Validators.required, Validators.min(0)]),
      specialPrice: new FormControl(null, Validators.min(0)),
      fromDate: new FormControl(),
      toDate: new FormControl(),
      discount: new FormControl(null, [Validators.required, Validators.min(0)]),
      productCost: new FormControl(null, [Validators.required, Validators.min(0)]),
      isBuyButtonDisabled: new FormControl(false),
      productId: new FormControl(null, [Validators.required, Validators.min(0)])
    }, {
      validators: [this.dateLessThan('fromDate', 'toDate'), this.priceValidator()]
    });
  }
  priceValidator(): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const salePrice = formGroup.get('salePrice')?.value;
      const mrp = formGroup.get('mrp')?.value;
      const specialPrice = formGroup.get('specialPrice')?.value;
      const productCost = formGroup.get('productCost')?.value;

      if (salePrice != null && mrp != null && salePrice >= mrp) {
        return { priceError: 'Sale price must be less than MRP.' };
      }
      if (specialPrice != null && salePrice != null && mrp != null && (specialPrice >= salePrice || specialPrice >= mrp)) {
        return { specialPriceError: 'Special price must be less than both sale price and MRP.' };
      }
      if (productCost != null && mrp != null && productCost >= mrp) {
        return { productCostError: 'Product Cost must be less than MRP' };
      }
      return null;
    };
  }
  onSubmit() {
    if (this.priceForm.valid) {
      this.priceService.savePrice(this.priceForm.value as Price).subscribe(
        (response: any) => {
          this.savedPriceData = response;
          console.log(response);
          alert('Data has been saved successfully!');
        },
        (error: any) => {
          console.error('Failed to save data!', error);
          alert('Failed to save data!');
        }
      );
    } else {
      
      if (this.priceForm.errors?.['priceError']) {
        alert(this.priceForm.errors['priceError']);
      } else if (this.priceForm.errors?.['specialPriceError']) {
        alert(this.priceForm.errors['specialPriceError']);
      } else if (this.priceForm.errors?.['productCostError']) {
        alert(this.priceForm.errors['productCostError']);
      } else if (this.priceForm.errors?.['dateRange']) {
        alert(this.priceForm.errors['dateRange']);
      } else {
        alert('Please fill the form correctly.');
      }
    }
  }

  onSaveAndEdit() {
    /*console.log(this.priceForm.get('priceId'));*/
    if (this.priceForm.valid) {
      /*const priceId = this.savedPriceData.priceId; */// Type assertion here
      const priceData = this.priceForm.value as Price;
      priceData.priceId = this.savedPriceData.priceId;
      console.log(this.savedPriceData.priceId);
      this.priceService.updatePrice(this.savedPriceData.priceId, priceData).subscribe(
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
  
  

  dateLessThan(from: string, to: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fromControl = control.get(from);
      const toControl = control.get(to);
      if (fromControl && toControl && fromControl.value > toControl.value) {
        return { dateRange: 'End date should be greater than start date.' };
      }
      return null;
    };
  }
}
