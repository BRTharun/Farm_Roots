import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoryDetailsComponent } from './category-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock classes for services
class MockCategoryService {
  getSubcategories(categoryId: number) {
    return of([{ subCategoryId: 1, subCategoryName: 'Apples' }]);
  }
}

class MockProductService {
  getCustomerProductsByCategoryId(categoryId: number) {
    return of({
      isSuccess: true,
      result: [{ productId: 1, productName: 'Apple' }]
    });
  }
  getCustomerProductsBySubCategoryId(subCategoryId: number) {
    return of({
      isSuccess: true,
      result: [{ productId: 2, productName: 'Green Apple' }]
    });
  }
}

describe('CategoryDetailsComponent', () => {
  let component: CategoryDetailsComponent;
  let fixture: ComponentFixture<CategoryDetailsComponent>;
  let categoryService: CategoryService;
  let productService: ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: ProductService, useClass: MockProductService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryDetailsComponent);
    component = fixture.componentInstance;
    categoryService = TestBed.inject(CategoryService);
    productService = TestBed.inject(ProductService);
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load subcategories and products on init', () => {
    expect(component.subcategories.length).toBeGreaterThan(0);
    expect(component.products.length).toBeGreaterThan(0);
  });

  it('should handle errors when fetching subcategories', () => {
    spyOn(categoryService, 'getSubcategories').and.returnValue(throwError(() => new Error('Error')));
    fixture.detectChanges();
    expect(component.subcategories.length).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should toggle sidenav', () => {
    expect(component.isExpanded).toBeTrue();
    component.toggleSidenav();
    expect(component.isExpanded).toBeFalse();
  });

  it('should filter products by subcategory', () => {
    const subcategory = {
      subCategoryId: 1, subCategoryName: 'Apples', categoryId: 100, imageUrl: 'path/to/image.jpg', category: 'Fruits'};
    component.onSubcategoryClick(subcategory);
    expect(component.products.length).toBeGreaterThan(0);
  });
});
