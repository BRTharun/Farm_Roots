import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ResponseDto } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  ////getProductsByCategory(categoryId: number): Observable<Product[]> {
  //  return this.http.get<Product[]>(`https://localhost:7189/api/Category/${categoryId}/products`);
  //}

  getCustomerProductsByCategoryId(categoryId: number): Observable<any> {
    return this.http.get<ResponseDto<Product[]>>(`https://localhost:7189/api/Category/${categoryId}/customer-products`);
  }
}
