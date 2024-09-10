// src/app/services/manufacturer.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from '../models/manufacturer.model';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {
  private apiUrl = 'https://localhost:7189/api/Manufacturer';

  constructor(private http: HttpClient) { }

  getAllManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.apiUrl);
  }

  addManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(this.apiUrl, manufacturer);
  }
  updateManufacturer(manufacturerId: number, newDisplayOrder: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${manufacturerId}/display-order`, newDisplayOrder);
  }

  updateManufacturerStatus(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.put<Manufacturer>(`${this.apiUrl}/${manufacturer.manufactureId}/toggle-featured`, {
      manufacturerFeaturedStatus: manufacturer.manufactureFeaturedStatus
    });
  }

  deleteManufacturer(manufactureId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${manufactureId}`);
  }
}
