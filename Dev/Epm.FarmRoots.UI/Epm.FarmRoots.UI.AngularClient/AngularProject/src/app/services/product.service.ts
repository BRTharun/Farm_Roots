import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateProduct, ResponseProduct} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7189/api/products'; // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

  createProduct(product: CreateProduct, tags: string[]): Observable<any> {
    product.vendorId = 1;
    product.productTags = tags;
    return this.http.post(this.apiUrl, product);
  }
  updateProduct(productId: number, product: ResponseProduct): Observable<any> {
    return this.http.put(`${this.apiUrl}/${productId}`, product);
  }
}
