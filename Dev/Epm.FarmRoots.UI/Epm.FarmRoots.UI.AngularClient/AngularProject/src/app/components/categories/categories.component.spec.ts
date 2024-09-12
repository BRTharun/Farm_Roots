import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { CategoryService } from '../../services/category.service';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Category } from '../../models/category.model';

// Mock classes
class MockCategoryService {
  getCategories(): Observable<Category[]> {
    return of([
      { categoryId: 1, categoryName: 'Fruit', imageUrl: 'path/to/fruit.jpg' },
      { categoryId: 2, categoryName: 'Vegetables', imageUrl: 'path/to/vegetables.jpg' }
    ]);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
}

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let mockCategoryService: MockCategoryService;
  let mockRouter: MockRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: Router, useClass: MockRouter }
      ]
    })
      .compileComponents();

    mockCategoryService = TestBed.inject(CategoryService) as any;
    mockRouter = TestBed.inject(Router) as any;
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(component.categories.length).toBe(2);
    expect(component.categories[0].categoryName).toEqual('Fruit');
  });

  it('should handle error when fetching categories fails', () => {
    spyOn(mockCategoryService, 'getCategories').and.returnValue(throwError(new Error('Failed to fetch categories')));
    fixture.detectChanges();  // Reinitialize the component to trigger ngOnInit again
    expect(console.error).toHaveBeenCalled();
  });

  it('should navigate to the correct category detail page', () => {
    component.goToCategory(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/category', 1]);
  });

  it('should handle undefined category ID', () => {
    spyOn(console, 'error');
    const undefinedCategoryId: number | undefined = undefined;
    component.goToCategory(undefinedCategoryId);
    expect(console.error).toHaveBeenCalledWith('Error: The category ID is undefined.');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
