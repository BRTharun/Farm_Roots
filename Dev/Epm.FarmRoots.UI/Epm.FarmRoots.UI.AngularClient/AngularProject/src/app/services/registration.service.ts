import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CustomerAddress } from '../models/customer-address';
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
    return this.http.put(url, data).pipe(catchError(error => this.handleError(error))
    );
  }




  addAddress(customerId: number, address: CustomerAddress): Observable<any> {
    return this.http.post(`${this.baseUrl}/customers/${customerId}/AddAddresses`, address);
  }

  updateAddress(customerId: number, addressId: number, address: CustomerAddress): Observable<any> {
    return this.http.put(`${this.baseUrl}/customers/${customerId}/addresses/${addressId}`, address);
  }

  getAddressesByCustomerId(customerId: number): Observable<CustomerAddress[]> {
    return this.http.get<CustomerAddress[]>(`${this.baseUrl}/customers/${customerId}/GetAddresses`);
  }


  changePassword(customerId: number, passwordDetails: { oldPassword: string, newPassword: string }): Observable<any> {
    const url = `${this.baseUrl}/Customer/ChangePassword/${customerId}`;
    return this.http.put(url, passwordDetails);
  }

  private handleError(error: any): Observable<never> {
    console.error('Login error', error);
    return throwError(error);
  }




}
