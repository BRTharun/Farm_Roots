import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    role: ''
  };

  customersArray: any[] = [];
  vendorsArray: any[] = [];
  isResultLoaded = false;
  passwordFieldType: string = 'password';
  confirmPasswordFieldType: string = 'password';
  passwordTouched: boolean = false;
  confirmPasswordTouched = false;
  emailErrorMsg: string | null = null;
  phoneErrorMsg: string | null = null;
  nameErrorMsg: string | null = null;
  passwordErrorMsg: string | null = null;
  private previousEmail: string = '';
  confirmpasswordErrorMsg: string | null = null;

  constructor(private registrationService: RegistrationService) {
  }

  ngOnInit(): void {
  }


  validateEmail(): void {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailRegex.test(this.user.email)) {
      this.emailErrorMsg = "Invalid email format!";
    } else {
      if (this.user.email !== this.previousEmail) {
        this.emailErrorMsg = null;
        this.checkEmailAvailability(this.user.email);
      }
      this.previousEmail = this.user.email;
    }
  }

  checkEmailAvailability(email: string): void {
    this.registrationService.getCustomersByEmail().pipe(
      debounceTime(3000)
    ).subscribe((customers: any[]) => {
      const emailExists = customers.some(customer => customer.email === email);
      if (emailExists) {
        this.emailErrorMsg = "This email is already registered.";
      } else {
        this.emailErrorMsg = null;
      }
    }, error => {
      this.emailErrorMsg = "";
    });
  }

  restrictToNumbers(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^\d$/.test(inputChar)) {
      event.preventDefault();
    }
  }

  validatePhone(): void {
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(this.user.phoneNumber)) {
      this.phoneErrorMsg = "Phone number must be 10 digits";
    } else {
      this.phoneErrorMsg = null;
    }
  }

  validateName(): void {
    const nameRegex = /^[a-zA-Z\s]{1,30}$/;
    if (!nameRegex.test(this.user.name)) {
      this.nameErrorMsg = "Name must only contain letters and spaces";
    } else {
      this.nameErrorMsg = null;
    }
  }

  validatePassword(): void {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{6,}$/;
    this.passwordTouched = true;
    if (this.user.password.length === 0) {
      this.passwordErrorMsg = "Password is required.";
    } else if (!passwordRegex.test(this.user.password)) {
      this.passwordErrorMsg = "Password must be at least 6 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$&*).";
    } else {
      this.passwordErrorMsg = null;
    }
  }


  validateConfirmPassword(): void {
    if (this.user.confirmPassword.length === 0) {
      this.confirmpasswordErrorMsg = "Confirm Password is required.";
    } else if (this.user.confirmPassword !== this.user.password) {
      this.confirmpasswordErrorMsg = "Passwords do not match.";
    } else {
      this.confirmpasswordErrorMsg = null;
    }
  }

  restrictToLetters(event: KeyboardEvent): void {
    const inputChar = String.fromCharCode(event.keyCode);
    if (!/^[a-zA-Z\s]$/.test(inputChar)) {
      event.preventDefault();
    }
  }




  register() {

    if (this.user.password !== this.user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const bodyData = {
      "name": this.user.name,
      "email": this.user.email,
      "phoneNumber": this.user.phoneNumber,
      "password": this.user.password,
      "role": this.user.role
    };

    const registerObservable = this.user.role === 'vendor' ? this.registrationService.registerVendor(bodyData) : this.registrationService.registerCustomer(bodyData);
    registerObservable.subscribe({
      next: (resultData: any) => {
        console.log(resultData);
        alert(resultData.message || "Registered Successfully!");
      },
      error: (error) => {
        console.error("Error during registration: ", error);
        alert(error.error.message || "An error occurred during registration!");
      }
    });
  }

  onSubmit() {
    this.register();
  }

  togglePasswordVisibility() {
    this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  toggleConfirmPasswordVisibility() {
    this.confirmPasswordFieldType = this.confirmPasswordFieldType === 'password' ? 'text' : 'password';
  }

  onPasswordBlur() {
    this.passwordTouched = true;
  }

  onConfirmPasswordBlur() {
    this.confirmPasswordTouched = true;
  }



  getCustomerByEmail() {
    this.registrationService.getCustomersByEmail().subscribe({
      next: (resultData: any) => {
        this.isResultLoaded = true;
        this.customersArray = resultData;
        console.log(resultData);
      },
      error: (error) => {
        console.error("Error while fetching customers: ", error);
      }
    });
  }
}
