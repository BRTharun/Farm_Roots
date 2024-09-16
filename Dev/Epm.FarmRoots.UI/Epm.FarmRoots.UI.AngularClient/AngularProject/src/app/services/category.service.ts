import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Category } from '../models/category.model';
import { Subcategory } from '../models/subcategory.model';


@Injectable({
  providedIn: 'root'
})

export class CategoryService {
  private baseUrl = 'https://localhost:7189/api/FarmRoots/Category';

  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<{ result: Category[] }>(this.baseUrl).pipe(
      map(response => response.result)
    );
  }

  getSubcategories(categoryId: number): Observable<Subcategory[]> {
    const url = `${this.baseUrl}/${categoryId}/subcategories`;
    return this.http.get<{ result: Subcategory[] }>(url).pipe(
      map(response => {
        if (!response.result) {
          throw new Error('Result property not found in response');
        }
        return response.result.map(subcat => ({
          subCategoryId: subcat.subCategoryId,
          subCategoryName: subcat.subCategoryName,
          categoryId: subcat.categoryId,
          imageUrl: subcat.imageUrl,
          category: subcat.category
        }));
      }),
      catchError(error => {
        console.error('Failed to fetch subcategories:', error);
        return throwError(error);
      })
    );
  }
}
