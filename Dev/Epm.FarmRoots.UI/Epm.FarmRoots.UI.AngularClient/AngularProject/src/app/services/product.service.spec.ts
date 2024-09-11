import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../models/product.model';
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
      { ProductName: 'Apple', ShortDescription: 'fresh apple', Price: 1.20, ImageUrl: 'agsuyahacdad' },
      { ProductName: 'Banana', ShortDescription: 'fresh banana', Price: 0.50, ImageUrl: 'afdseyuhiydfgh' }
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

    const req = httpMock.expectOne(`https://localhost:7189/api/Category/${categoryId}/customer-products`);
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

    const req = httpMock.expectOne(`https://localhost:7189/api/Category/${categoryId}/customer-products`);
    req.error(errorResponse);
    it('should return an array of products for a given subcategory', () => {
      const mockProducts: Product[] = [
        { ProductName: 'Apple', ShortDescription: 'fresh apple', Price: 1.20, ImageUrl: 'agsuyahacdad' },
        { ProductName: 'Banana', ShortDescription: 'fresh banana', Price: 0.50, ImageUrl: 'afdseyuhiydfgh' }
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

      const req = httpMock.expectOne(`https://localhost:7189/api/SubCategory/${subCategoryId}/customer-sub-products`);
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

      const req = httpMock.expectOne(`https://localhost:7189/api/SubCategory/${subCategoryId}/customer-sub-products`);
      req.error(errorResponse);
    });
  });
});
