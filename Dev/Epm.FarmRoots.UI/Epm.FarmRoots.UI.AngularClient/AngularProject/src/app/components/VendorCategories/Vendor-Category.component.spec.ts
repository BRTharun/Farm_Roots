import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VendorCategoriesComponent } from '../VendorCategories/Vendor-Category.component';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Category } from '../../models/category.model';
import { NavigationExtras, Router } from '@angular/router';
class MockCategoryService {
  getCategories() {
    return of([{ categoryId: 1, categoryName: 'Category 1' }, { categoryId: 2, categoryName: 'Category 2' }] as Category[]);
  }
}

class MockRouter {
  navigate = jasmine.createSpy('navigate');
  constructor() {
    // Defining what the spy should do when called
    this.navigate.and.callFake((commands: any[], extras?: NavigationExtras): Promise<boolean> => {
      return Promise.resolve(true);
    });
  }
}

class MockMatDialog {
  open(dialogComponent: any, dialogConfig?: any) {
    return {
      afterClosed: () => of(true)
    };
  }
}

class MockMatSnackBar {
  open(message: string, action?: string, config?: any) {
    // Nothing needs to be done in the mock
  }
}

describe('VendorCategoriesComponent', () => {
  let component: VendorCategoriesComponent;
  let fixture: ComponentFixture<VendorCategoriesComponent>;
  let mockCategoryService: MockCategoryService;
  let mockRouter: MockRouter;
  let mockDialog: MockMatDialog;
  let mockSnackBar: MockMatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VendorCategoriesComponent],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: Router, useClass: MockRouter },
        { provide: MatDialog, useClass: MockMatDialog },
        { provide: MatSnackBar, useClass: MockMatSnackBar }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorCategoriesComponent);
    component = fixture.componentInstance;
    mockCategoryService = TestBed.inject(CategoryService);
    mockRouter = TestBed.inject(Router) as any;
    mockDialog = TestBed.inject(MatDialog);
    mockSnackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    spyOn(mockCategoryService, 'getCategories').and.callThrough();
    component.ngOnInit();
    expect(mockCategoryService.getCategories).toHaveBeenCalled();
    expect(component.allCategories.length).toBe(2);
  });


  it('should open the confirmation dialog when deleting a category', () => {
    spyOn(mockDialog, 'open').and.callThrough();
    component.deleteCategoryFromDisplay(1);
    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should show snackbar on successful category deletion', () => {
    spyOn(mockSnackBar, 'open');
    component.deleteCategoryFromDisplay(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Category deleted successfully', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
  });

  // Add more tests as necessary
});
