import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  role: string = 'customer';
  errorMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const body = { email: this.email, password: this.password, role: this.role };
    const url = this.role === 'vendor' ? 'https://localhost:44350/vendorlogin/login' : 'https://localhost:44350/customerlogin/login';

    this.http.post<any>(url, body).subscribe(
      (response) => {
        if (response.token && response.id) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('userId', response.id);
          if (this.role === 'customer') {
            this.router.navigate(['/profile']);
          } else if (this.role === 'vendor') {
            this.router.navigate(['/vendorprofile']);
          }
        } else {
          this.errorMessage = 'Login Failed: Missing token or user information.';
        }
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = error.error?.message || 'Login failed. Please check your credentials and try again.';
      }
    );
  }
}
