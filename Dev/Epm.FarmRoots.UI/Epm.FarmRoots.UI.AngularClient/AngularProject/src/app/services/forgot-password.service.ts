import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  private apiUrl = 'https://localhost:7116/api/ForgotPassword';  

  constructor(private http: HttpClient) { }

  requestPasswordReset(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-password-reset`, data);
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, data);
  }
}
