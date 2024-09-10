import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    }, error => {
      console.error('Error fetching categories', error);
    });
  }

  goToCategory(categoryId: number) {
    console.log("Category ID:", categoryId);  // This will show you what ID is being passed
    if (categoryId !== undefined) {
      this.router.navigate(['/category', categoryId]);
    } else {
      console.error('Error: The category ID is undefined.');
    }
  }
}
