import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Subcategory } from '../../models/subcategory.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../ConfirmationDialog/confirmation-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './Vendor-Category.component.html',
  styleUrls: ['./Vendor-Category.component.css']
})
export class VendorCategoriesComponent implements OnInit {
  allCategories: Category[] = [];
  displayedCategories: Category[] = [];
  subCategories: Subcategory[] = [];
  selectedCategoryId: number=0;

  constructor(private categoryService: CategoryService, private router: Router, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loadCategories();
  }
  onCategorySelected(categoryId: number): void {
    this.router.navigate(['/vendor-category', categoryId, 'subcategory']);
  }
  loadCategories(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.allCategories = categories;
    });
  }

  addCategoryToDisplay(categoryId: number): void {
    const category = this.allCategories.find(c => c.categoryId === +categoryId);
    if (category && !this.displayedCategories.some(c => c.categoryId === category.categoryId)) {
      this.displayedCategories.push(category);
      this.resetDropdown();
    }
  }

  resetDropdown(): void {
    const categorySelect = document.querySelector('.dropdown') as HTMLSelectElement;
    if (categorySelect) {
      categorySelect.value = '';
    } else {
      console.error('Dropdown element not found!');
    }
  }

  deleteCategoryFromDisplay(categoryId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayedCategories = this.displayedCategories.filter(c => c.categoryId !== categoryId);
        this.subCategories = []; // Reset subcategories if needed
        this.snackBar.open('Category deleted successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  deleteSubCategory(subCategoryId: number): void {
    this.subCategories = this.subCategories.filter(subCategory => subCategory.subCategoryId !== subCategoryId);
  }
} 
