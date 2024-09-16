import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/productCustView.model';
import { ResponseDto } from '../models/response.model';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should return an array of products for a given category', () => {
    const mockProducts: Product[] = [
      { productId: 1, productName: 'Apple', shortDescription: 'fresh apple', price: 1.20, image: 'agsuyahacdad' },
      { productId: 2, productName: 'Banana', shortDescription: 'fresh banana', price: 0.50, image: 'afdseyuhiydfgh' }
    ];
    const categoryId = 1;
    const mockResponse: ResponseDto<Product[]> = {
      isSuccess: true,
      message: 'Success',
      result: mockProducts
    };

    service.getCustomerProductsByCategoryId(categoryId).subscribe(products => {
      expect(products.result.length).toBe(2);
      expect(products.result).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`https://localhost:7189/api/FarmRoots/Category/${categoryId}/customer-products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors when fetching products by category', () => {
    const errorResponse = new ErrorEvent('API error');
    const categoryId = 1;

    service.getCustomerProductsByCategoryId(categoryId).subscribe({
      next: () => fail('should have failed with the 500 error'),
      error: (error) => expect(error.error).toBe(errorResponse)
    });

    const req = httpMock.expectOne(`https://localhost:7189/api/FarmRoots/Category/${categoryId}/customer-products`);
    req.error(errorResponse);
    it('should return an array of products for a given subcategory', () => {
      const mockProducts: Product[] = [
        { productId: 1, productName: 'Apple', shortDescription: 'fresh apple', price: 1.20, image: 'agsuyahacdad' },
        { productId: 2, productName: 'Banana', shortDescription: 'fresh banana', price: 0.50, image: 'afdseyuhiydfgh' }
      ];
      const subCategoryId = 2;
      const mockResponse: ResponseDto<Product[]> = {
        isSuccess: true,
        message: 'Success',
        result: mockProducts
      };

      service.getCustomerProductsBySubCategoryId(subCategoryId).subscribe(products => {
        expect(products.result.length).toBe(2);
        expect(products.result).toEqual(mockProducts);
      });

      const req = httpMock.expectOne(`https://localhost:7189/api/FarmRoots/SubCategory/${subCategoryId}/customer-sub-products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should handle errors when fetching products by subcategory', () => {
      const errorResponse = new ErrorEvent('API error');
      const subCategoryId = 2;

      service.getCustomerProductsBySubCategoryId(subCategoryId).subscribe({
        next: () => fail('should have failed with the 500 error'),
        error: (error) => expect(error.error).toBe(errorResponse)
      });

      const req = httpMock.expectOne(`https://localhost:7189/api/FarmRoots/SubCategory/${subCategoryId}/customer-sub-products`);
      req.error(errorResponse);
    });
  });
});
