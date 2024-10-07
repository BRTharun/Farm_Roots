import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'https://localhost:44350';  // Use API Gateway URL

  constructor(private http: HttpClient) { }

  login(email: string, password: string, role: string): Observable<any> {
    const url = `${this.apiUrl}/customerlogin/login`; // Adjust endpoint if needed
    const body = { email, password, role };

    return this.http.post<any>(url, body).pipe(
      map(response => response),
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Login error', error);
    return throwError(error);
  }
}
