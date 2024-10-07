import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private router: Router) { }
  logout() {
    // Assuming logout means just clearing the local storage and redirecting to login page
    localStorage.clear(); // Clear user token or other data from storage

    // Add here any needed API calls to your back-end to notify about logout or invalidate session
    // Example (uncomment and adjust if needed):
    // this.authService.logout().subscribe(() => {
    //   console.log('Logged out successfully');
    // });

    this.router.navigate(['/header']); // Redirect to login page after logout
  }

}
