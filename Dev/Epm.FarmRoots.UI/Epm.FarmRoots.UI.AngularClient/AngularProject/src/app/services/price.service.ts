
// src/app/services/price.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Price } from '../models/price.model';

@Injectable({
  providedIn: 'root'
})
export class PriceService {
  private apiBaseUrl = 'https://localhost:7189/api/FarmRoots/Price';

  constructor(private http: HttpClient) { }

  savePrice(priceData: Price): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}`, priceData);
  }
  updatePrice(priceId: number, priceData: Price): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}/${priceId}`, priceData);
  }

  // You can add more methods related to price management here
}
