import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerAddress } from '../../models/customer-address';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-add-customer-address',
  templateUrl: './add-customer-address.component.html',
  styleUrls: ['./add-customer-address.component.css']
})
export class AddCustomerAddressComponent implements OnInit {
  addressForm: FormGroup;
  addresses: CustomerAddress[] = [];
  customerId: number | null = null;

  constructor(private fb: FormBuilder, private addressService: RegistrationService) {
    this.addressForm = this.fb.group({
      customerAddressId: [null],
      houseNoFloor: ['', [Validators.required, Validators.maxLength(50)]],
      buildingBlockNo: ['', [Validators.required, Validators.maxLength(50)]],
      pincode: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]{5}$/)]],
      landmarkAreaName: ['', [Validators.maxLength(100)]]
    });
  }

  ngOnInit() {
    this.customerId = parseInt(localStorage.getItem('customerId') || '0', 10);
    if (this.customerId) {
      this.fetchAddresses();
    } else {
      console.error('Customer ID not found');
    }
  }

  fetchAddresses() {
    if (this.customerId) {
      this.addressService.getAddressesByCustomerId(this.customerId).subscribe(
        data => this.addresses = data,
        error => console.error('Error fetching addresses', error)
      );
    }
  }

  onSubmit() {
    if (this.addressForm.valid && this.customerId) {
      const address: CustomerAddress = this.addressForm.value;
      if (address.customerAddressId) {
        this.updateAddress(address.customerAddressId, address);
      } else {
        this.addAddress(this.customerId, address);
      }
    }
  }

  addAddress(customerId: number, address: CustomerAddress) {
    if (customerId) {
      this.addressService.addAddress(customerId, address).subscribe({
        next: () => {
          alert('Address successfully added');
          this.fetchAddresses();
        },
        error: (error) => console.error('Error adding address', error)
      });
    }
  }

  updateAddress(addressId: number, address: CustomerAddress) {
    if (this.customerId) {
      this.addressService.updateAddress(this.customerId, addressId, address).subscribe({
        next: () => {
          alert('Address updated Successfully');
          this.fetchAddresses();
        },
        error: (error) => console.error('Error updating address', error)
      });
    }
  }

  onEdit(address: CustomerAddress) {
    this.addressForm.patchValue(address);
  }
}
