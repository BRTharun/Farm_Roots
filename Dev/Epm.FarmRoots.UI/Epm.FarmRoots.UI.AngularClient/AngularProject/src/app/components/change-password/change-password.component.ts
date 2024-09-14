import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      newPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      const formValues = this.changePasswordForm.value;
      this.registrationService.changePassword(4, formValues).subscribe({
        next: (response) => {
          console.log('Password changed successfully', response);
          alert('Password updated successfully');
        },
        error: (error) => {
          console.error('Failed to change password', error);
          alert('Failed to update password');
        }
      });
    } else {
      console.error('Form is not valid!');
    }
  }
}
