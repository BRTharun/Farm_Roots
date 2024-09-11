import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CategoryService } from './category.service';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;
  const baseUrl = 'https://localhost:7189/api/Category';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CategoryService]
    });

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that no unmatched requests are outstanding.
  });

  it('should return an array of categories', () => {
    const mockCategories: Category[] = [
      { categoryId: 1, categoryName: 'Fruits', imageUrl: 'tasdyudeckefv' },
      { categoryId: 2, categoryName: 'Vegetables', imageUrl: 'dwyfdvufjbdvejf' }
    ];

    service.getCategories().subscribe(categories => {
      expect(categories.length).toBe(2);
      expect(categories).toEqual(mockCategories);
    });

    const req = httpMock.expectOne(baseUrl);
    expect(req.request.method).toBe('GET');
    req.flush({ result: mockCategories });
  });

  it('should handle errors on getCategories', () => {
    const error = 'Failed to fetch categories';
    service.getCategories().subscribe({
      next: () => fail('should have failed with the error'),
      error: (e) => expect(e.message).toContain(error)
    });

    const req = httpMock.expectOne(baseUrl);
    req.flush({ message: error }, { status: 500, statusText: 'Server Error' });
  });

  it('should return an array of subcategories', () => {
    const mockSubcategories: Subcategory[] = [
      { subCategoryId: 1, subCategoryName: 'Apples', categoryId: 1, imageUrl: 'url', category: 'Fruits' }
    ];
    const categoryId = 1;

    service.getSubcategories(categoryId).subscribe(subcategories => {
      expect(subcategories.length).toBe(1);
      expect(subcategories).toEqual(mockSubcategories);
    });

    const req = httpMock.expectOne(`${baseUrl}/${categoryId}/subcategories`);
    expect(req.request.method).toBe('GET');
    req.flush({ result: mockSubcategories });
  });

  it('should handle errors on getSubcategories', () => {
    const error = 'Failed to fetch subcategories';
    const categoryId = 1;

    service.getSubcategories(categoryId).subscribe({
      next: () => fail('should have failed with the error'),
      error: (e) => expect(e.message).toContain(error)
    });

    const req = httpMock.expectOne(`${baseUrl}/${categoryId}/subcategories`);
    req.flush({ message: error }, { status: 500, statusText: 'Server Error' });
  });

});
