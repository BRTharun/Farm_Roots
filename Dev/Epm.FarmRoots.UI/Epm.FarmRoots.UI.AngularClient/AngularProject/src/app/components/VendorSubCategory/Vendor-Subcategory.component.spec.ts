import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubcategoryComponent } from './Vendor-Subcategory.component';
import { CategoryService } from '../../services/category.service';
import { ConfirmationDialogComponent } from '../ConfirmationDialog/confirmation-dialog.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('VendorSubcategoryComponent', () => {
  let component: SubcategoryComponent;
  let fixture: ComponentFixture<SubcategoryComponent>;
  let categoryService: jasmine.SpyObj<CategoryService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {
    categoryService = jasmine.createSpyObj('CategoryService', ['getSubcategories']);
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SubcategoryComponent, ConfirmationDialogComponent],
      providers: [
        { provide: CategoryService, useValue: categoryService },
        { provide: MatDialog, useValue: dialog },
        { provide: MatSnackBar, useValue: snackBar },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ categoryId: 1 }),
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubcategoryComponent);
    component = fixture.componentInstance;
    categoryService.getSubcategories.and.returnValue(of([{ subCategoryId: 1, subCategoryName: 'Subcategory 1', categoryId: 1, imageUrl: '', category: '' }]));
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load subcategories on init', () => {
    expect(component.subcategories.length).toBe(1);
    expect(component.subcategories[0].subCategoryName).toBe('Subcategory 1');
  });

  it('should add subcategory to display', () => {
    component.addSubcategoryToDisplay(1);
    expect(component.displayedSubcategories.length).toBe(1);
    expect(component.displayedSubcategories[0].subCategoryId).toBe(1);
  });

  it('should not add duplicate subcategory to display', () => {
    component.addSubcategoryToDisplay(1);
    component.addSubcategoryToDisplay(1);
    expect(component.displayedSubcategories.length).toBe(1);
  });

  it('should delete subcategory from display', () => {
    component.addSubcategoryToDisplay(1);
    dialog.open.and.returnValue({ afterClosed: () => of(true) } as any);

    component.deleteSubcategoryFromDisplay(1);

    expect(component.displayedSubcategories.length).toBe(0);
    expect(snackBar.open).toHaveBeenCalledWith('Subcategory deleted successfully', 'Close', { duration: 3000, verticalPosition: 'top', horizontalPosition: 'center' });
  });

  it('should not delete subcategory if confirmation is false', () => {
    component.addSubcategoryToDisplay(1);
    dialog.open.and.returnValue({ afterClosed: () => of(false) } as any);

    component.deleteSubcategoryFromDisplay(1);

    expect(component.displayedSubcategories.length).toBe(1);
  });
});
