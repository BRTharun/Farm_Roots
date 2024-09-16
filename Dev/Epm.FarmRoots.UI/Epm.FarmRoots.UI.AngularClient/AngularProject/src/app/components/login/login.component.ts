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
    const url = this.role === 'vendor'
      ? 'https://localhost:44350/vendorlogin/login'
      : 'https://localhost:44350/customerlogin/login';

    this.http.post<any>(url, body).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.error('Login error', error);
        this.errorMessage = 'Login failed. Please check your credentials and try again.';
      }
    );
  }
}
