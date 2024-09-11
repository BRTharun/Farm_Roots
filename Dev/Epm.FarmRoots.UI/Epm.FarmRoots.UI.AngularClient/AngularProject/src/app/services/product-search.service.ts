import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/productCustView.model';


@Injectable({
  providedIn: 'root'
})
export class ProductSearchService {
  private apiUrl = 'https://localhost:7189/api/ProductSearch';

  constructor(private http: HttpClient) { }

  searchByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/SearchByName/${name}`);
  }

  searchByVoice(query: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/VoiceSearch`, { params: { query } });
  }
}
