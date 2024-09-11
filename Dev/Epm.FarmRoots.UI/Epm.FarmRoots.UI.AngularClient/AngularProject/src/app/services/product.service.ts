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

  getCustomerProductsByCategoryId(categoryId: number): Observable<any> {
    return this.http.get<ResponseDto<Product[]>>(`https://localhost:7189/api/Category/${categoryId}/customer-products`);
  }

  getCustomerProductsBySubCategoryId(subCategoryId: number): Observable<any> {
    return this.http.get<ResponseDto<Product[]>>(`https://localhost:7189/api/SubCategory/${subCategoryId}/customer-sub-products`);
  }
}
