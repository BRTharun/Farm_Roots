import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
})
export class RequestPasswordResetComponent {
  resetForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      userType: ['customer', Validators.required],
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const formData = this.resetForm.value;
      this.forgotPasswordService.requestPasswordReset(formData).subscribe(
        (response) => {
          this.message = response.message;
        },
        (error) => {
          this.message = error.error.message;
        }
      );
    }
  }
}
