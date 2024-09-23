import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Subcategory } from '../../models/subcategory.model';
import { CategoryService } from '../../services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from '../ConfirmationDialog/confirmation-dialog.component';

@Component({
  selector: 'app-subcategory',
  templateUrl: './Vendor-Subcategory.component.html',
  styleUrls: ['./Vendor-Subcategory.component.css']
})
export class SubcategoryComponent implements OnInit {
  subcategories: Subcategory[] = [];
  displayedSubcategories: Subcategory[] = [];
  categoryId: number=0;

  constructor(private route: ActivatedRoute, private http: HttpClient, private categoryService: CategoryService, private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => {
        this.categoryId = +params['categoryId'];
        return this.getSubcategories(this.categoryId);
      })
    ).subscribe(
      subcategories => { this.subcategories = subcategories; console.log(subcategories); },
      error => console.error('Error loading subcategories:', error)
    );
  }

  getSubcategories(categoryId: number): Observable<Subcategory[]> {
    return this.categoryService.getSubcategories(categoryId);
  }

  addSubcategoryToDisplay(subcategoryId: number): void {
    const subcategory = this.subcategories.find(sc => sc.subCategoryId === subcategoryId);
    if (subcategory && !this.displayedSubcategories.some(sc => sc.subCategoryId === subcategoryId)) {
      this.displayedSubcategories.push(subcategory);
      this.resetDropdown();
    } else {
      console.error('Subcategory not found or already added');
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

  deleteSubcategoryFromDisplay(subcategoryId: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.displayedSubcategories = this.displayedSubcategories.filter(sc => sc.subCategoryId !== subcategoryId);
        this.snackBar.open('Subcategory deleted successfully', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
