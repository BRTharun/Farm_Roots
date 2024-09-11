import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {

  editProfileForm!: FormGroup;
  message = { text: null as string | null, type: null as string | null };

  constructor(private fb: FormBuilder, private registrationService: RegistrationService) {
    registrationService.updateProfile;
  }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(6), Validators.maxLength(50)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]]
    });
  }


  onSubmit(): void {
    if (this.editProfileForm.valid) {
      const formData = this.editProfileForm.value;
      console.log(formData);
      this.registrationService.updateProfile(6, formData).subscribe({
        next: (response) => {
          this.message = { text: 'Customer profile has been updated successfully.', type: 'success' };
          alert('Profile updated successfully');
        },
        error: (error) => {
          this.message = { text: 'Failed to update customer profile.', type: 'error' };
          console.error('Error updating profile', error);
        }
      });
    } else {
      this.message = { text: 'Please fill all required fields correctly.', type: 'error' };
    }
  }

}
