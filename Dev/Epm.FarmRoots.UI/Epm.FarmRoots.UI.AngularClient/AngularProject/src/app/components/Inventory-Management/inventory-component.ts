import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../services/inventory.service'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Inventory } from '../../models/inventory.model';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory-component.html',
  styleUrls: ['./inventory-component.css']
})
export class InventoryComponent {
  inventoryForm: FormGroup;

  constructor(private fb: FormBuilder, private inventoryService: InventoryService, private snackBar: MatSnackBar) {
    this.inventoryForm = this.fb.group({
      productStockQuantity: [0, Validators.required],
      productMinCartQuantity: [1, Validators.min(1)],
      productMaxCartQuantity: [50, Validators.min(1)]
    });
  }

  onSave()
  {
    if (this.inventoryForm.valid) {
      const inventoryData: Inventory = this.inventoryForm.value;
      this.inventoryService.addInventory(inventoryData).subscribe({
        next: (inventory: Inventory) => {
          console.log('Inventory added:', inventory);
          this.snackBar.open('Inventory added successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Failed to add inventory', error);
          this.snackBar.open('Failed to add inventory', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('Please fill out the form correctly', 'Close', { duration: 3000 });
    }
  }

  onDelete() {
    console.log('Delete action triggered');
  }
}
