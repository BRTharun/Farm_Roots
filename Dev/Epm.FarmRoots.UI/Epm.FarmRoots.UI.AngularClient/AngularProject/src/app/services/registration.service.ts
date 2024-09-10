import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseUrl: string = "https://localhost:7116/api";
  constructor(private http: HttpClient) { }

  registerCustomer(user: any): Observable<any> {
    const url = `${this.baseUrl}/Customer/register`;
    return this.http.post(url, user);
  }

  registerVendor(user: any): Observable<any> {
    const url = `${this.baseUrl}/Vendor/register`;
    return this.http.post(url, user);
  }

  getCustomersByEmail(): Observable<any> {
    const url = `${this.baseUrl}/Customer/GetCustomerByEmail`;
    return this.http.get(url);
  }


  updateProfile(customerId: number, data: { name: string, email: string, phoneNumber: string }): Observable<any> {
    const url = `${this.baseUrl}/Customer/UpdateCustomer/${customerId}`;
    return this.http.put(url, data).pipe(
      catchError(error => this.handleError(error))
    );
  }



  changePassword(customerId: number, passwordDetails: { oldPassword: string, newPassword: string }): Observable<any> {
    const url = `${this.baseUrl}/Customer/ChangePassword/${customerId}`;
    return this.http.put(url, passwordDetails);
  }


  login(email: string, password: string, role: string): Observable<any> {
    const url = `${this.baseUrl}/customerlogin/login`;
    const body = { email, password, role };

    return this.http.post<any>(url, body).pipe(map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Login error', error);
    return throwError(error);
  }




}
