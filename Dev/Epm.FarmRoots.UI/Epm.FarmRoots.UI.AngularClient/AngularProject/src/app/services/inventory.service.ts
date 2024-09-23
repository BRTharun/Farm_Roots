import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Inventory } from '../models/inventory.model';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  private apiUrl = 'https://localhost:7189/api/InventoryCart';

  constructor(private http: HttpClient) { }

  getInventories(): Observable<Inventory[]> {
    return this.http.get<Inventory[]>(this.apiUrl);
  }

  getInventoryById(productId: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/by-product/${productId}`).pipe(
      catchError(error => {
        if (error.status === 404) {
          return of({ productId } as Inventory);
        }
        return throwError(() => error);
      })
    );
  }

  saveInventory(inventory: Inventory): Observable<Inventory> {
    const body = {
      productId: inventory.productId,
      stockQuantity: inventory.productStockQuantity,
      minCartQuantity: inventory.productMinCartQuantity,
      maxCartQuantity: inventory.productMaxCartQuantity
    };
    return this.http.post<Inventory>(`${this.apiUrl}`, body);
  }
}
