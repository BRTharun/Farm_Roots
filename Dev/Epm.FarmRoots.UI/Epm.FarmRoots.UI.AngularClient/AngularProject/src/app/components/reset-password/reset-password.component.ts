import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForgotPasswordService } from '../../services/forgot-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  message: string = '';
  token: string = '';
  email: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private forgotPasswordService: ForgotPasswordService
  ) {
    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      userType: ['', Validators.required], //
    });
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.token = params['token'];
      this.email = params['email'];
    });
  }

  onSubmit() {
    if (this.resetForm.valid) {
      const formData = {
        token: this.token,
        email: this.email,
        newPassword: this.resetForm.value.newPassword,
        userType: this.resetForm.value.userType, //
      };
      this.forgotPasswordService.resetPassword(formData).subscribe(
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
