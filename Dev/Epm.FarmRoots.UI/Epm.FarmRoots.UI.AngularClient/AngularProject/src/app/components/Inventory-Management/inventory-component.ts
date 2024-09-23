import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory-component.html',
  styleUrls: ['./inventory-component.css']
})
export class InventoryComponent implements OnInit {
  inventoryForm: FormGroup;
  currentInventory: Inventory | null = null;
  productId: number = 0;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.inventoryForm = this.fb.group({
      productId: [this.productId, Validators.required],
      productStockQuantity: [0, [Validators.required, Validators.min(0)]],
      productMinCartQuantity: [1, [Validators.required, Validators.min(1)]],
      productMaxCartQuantity: [50, [Validators.required, Validators.min(1)]]
    });
    this.route.params.subscribe(params => {
      this.productId = 1; // +params['id']
      if (this.productId) {
        this.loadInventory(this.productId);
      } else {
        console.error('Product ID is missing');
      }
    });
  }

  ngOnInit() {
  }

  loadInventory(productId: number) {
    this.inventoryService.getInventoryById(productId).subscribe({
      next: (inventory: Inventory) => {
        this.currentInventory = inventory;
        this.inventoryForm.patchValue(inventory);
      },
      error: (error) => {
        console.error('Failed to load inventory', error);
        this.snackBar.open('Failed to load inventory', 'Close', { duration: 3000 });
      }
    });
  }

  createInventoryForProduct(productId: number) {
    const defaultInventory = {
      productId: productId,
      productStockQuantity: 0,
      productMinCartQuantity: 1,
      productMaxCartQuantity: 10
    };
    this.inventoryService.saveInventory(defaultInventory as Inventory).subscribe({
      next: (inventory: Inventory) => {
        console.log('New Inventory created:', inventory);
        this.currentInventory = inventory;
        this.inventoryForm.patchValue(inventory);
        this.snackBar.open('New Inventory created successfully', 'Close', { duration: 3000 });
      },
      error: (error) => {
        console.error('Failed to create inventory', error);
        this.snackBar.open('Failed to create inventory', 'Close', { duration: 3000 });
      }
    });
  }

  onSave() {
    if (this.inventoryForm.valid) {
      const inventoryData: Inventory = { ...this.currentInventory, ...this.inventoryForm.value };
      if (!inventoryData.productId || inventoryData.productId === 0) {
        this.snackBar.open('Invalid Product ID', 'Close', { duration: 3000 });
        return;
      }
      this.inventoryService.saveInventory(inventoryData).subscribe({
        next: (inventory: Inventory) => {
          console.log('Inventory updated:', inventory);
          this.snackBar.open('Inventory updated successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Failed to update inventory', error);
          this.snackBar.open('Failed to update inventory', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }
}
