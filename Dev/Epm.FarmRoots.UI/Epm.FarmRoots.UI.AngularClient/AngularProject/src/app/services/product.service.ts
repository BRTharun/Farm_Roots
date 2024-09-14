import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/productCustView.model';
import { ResponseDto } from '../models/response.model';
import { CreateProduct, ResponseProduct} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'https://localhost:7189/api/products'; // Adjust the API URL as needed

  constructor(private http: HttpClient) { }

    getCustomerProductsByCategoryId(categoryId: number): Observable<any> {
        return this.http.get<ResponseDto<Product[]>>(`https://localhost:7189/api/Category/${categoryId}/customer-products`);
    }
    createProduct(product: CreateProduct, tags: string[]): Observable<any> {
      product.vendorId = 1;
      product.categoryId = 1;
      product.manufacturerId = 1;
      product.subcategoryId = 2;
    product.productTags = tags;
    return this.http.post(this.apiUrl, product);
  }

    getCustomerProductsBySubCategoryId(subCategoryId: number): Observable<any> {
        return this.http.get<ResponseDto<Product[]>>(`https://localhost:7189/api/SubCategory/${subCategoryId}/customer-sub-products`);
    }

  updateProduct(productId: number, product: ResponseProduct): Observable<any> {
    product.vendorId = 1;
    product.categoryId = 1;
    product.manufacturerId = 1;
    product.subcategoryId = 2
    return this.http.put(`${this.apiUrl}/${productId}`, product);
  }
}
