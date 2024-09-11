import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService } from '../../services/product.service'; // Import ProductService
import { Subcategory } from '../../models/subcategory.model';
import { Product } from '../../models/product.model'; // Ensure you have a Product model
import { ResponseDto } from '../../models/response.model'; // Ensure you have a Response model if needed

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.scss']
})
export class CategoryDetailsComponent implements OnInit {
  isExpanded: boolean = true;
  subcategories: Subcategory[] = [];
  products: Product[] = []; // Use the Product model if available
  errorMessage: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService, // Add ProductService
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const categoryId = +id;
      this.categoryService.getSubcategories(categoryId).subscribe(subcategories => {
        this.subcategories = subcategories;
      }, (error: any) => {
        console.error('Error fetching subcategories', error);
      });

      this.productService.getCustomerProductsByCategoryId(categoryId).subscribe({
        next: (response) => {
          if (response.isSuccess && response.result) {
            this.products = response.result;
          } else {
            this.products = []; // Clear products if no success
            this.errorMessage = response.message || 'Failed to load products';
          }
        },
        error: error => {
          console.error('Error fetching customer products', error);
          this.errorMessage = 'Error fetching products'; // Use errorMessage to store error messages
        }
      });


    } else {
      console.error('Category ID is missing');
    }
  }

  toggleSidenav(): void {
    this.isExpanded = !this.isExpanded;
  }

  onSubcategoryClick(subcategory: Subcategory): void {
    console.log('Subcategory clicked:', subcategory);
    this.productService.getCustomerProductsBySubCategoryId(subcategory.subCategoryId).subscribe({
      next: (response) => {
        if (response.isSuccess && response.result && response.result.length > 0) {
          this.products = response.result;
        } else {
          this.products = []; // Clear products if no success or empty array
          this.errorMessage = 'No products found for this subcategory'; // Custom message for empty products
        }
      },
      error: error => {
        console.error('Error fetching customer products by subcategory', error);
        this.errorMessage = 'Error fetching products'; // Use errorMessage to store error messages
      }
    });
  }
}
