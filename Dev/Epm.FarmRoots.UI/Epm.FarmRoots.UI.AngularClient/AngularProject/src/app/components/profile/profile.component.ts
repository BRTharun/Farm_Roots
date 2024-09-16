import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  currentView: string = '';
  constructor(private router: Router) { }

  logout() {
    localStorage.clear();

    // Add here any needed API calls to your back-end to notify about logout or invalidate session
    // Example (uncomment and adjust if needed):
    // this.authService.logout().subscribe(() => {
    //   console.log('Logged out successfully');
    // });

    this.router.navigate(['/login']);
  }

}
