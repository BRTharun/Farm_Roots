import { Component, OnInit } from '@angular/core';
import { Manufacturer } from '../../models/manufacturer.model';
import { ManufacturerService } from '../../services/manufacturer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../ConfirmationDialog/confirmation-dialog.component';

@Component({
  selector: 'app-manufacturer-mappings',
  templateUrl: './manufacture-mapping.component.html',
  styleUrls: ['./manufacture-mapping.component.css']
})
export class ManufacturerMappingsComponent implements OnInit {
  manufacturers: Manufacturer[] = [];
  addingNew = false;
  selectedManufacturerId: number | null = null;
  newManufacturer: Manufacturer = {} as Manufacturer;

  constructor(private manufacturerService: ManufacturerService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.loadManufacturers();
  }

  loadManufacturers() {
    this.manufacturerService.getAllManufacturers().subscribe(
      (data) => {
        this.manufacturers = data;
      },
      (error) => {
        console.error('Failed to load manufacturers', error);
      }
    );
  }

  saveManufacturer(manufacturer: Manufacturer) {
    if (!manufacturer) {
      console.error('No manufacturer provided for update');
      return;
    }
    const manufacturerId = manufacturer.manufactureId;
    const newDisplayOrder = manufacturer.manufactureDisplayOrder;

    this.manufacturerService.updateManufacturer(manufacturerId, newDisplayOrder).subscribe({
      next: (response) => {
        console.log('Manufacturer updated:', response);
        const index = this.manufacturers.findIndex(m => m.manufactureId === manufacturerId);
        if (index !== -1) {
          this.manufacturers[index].manufactureDisplayOrder = newDisplayOrder;
        }
        this.addingNew = false;
      },
      error: (error) => {
        console.error('Failed to update manufacturer', error);
      }
    });
  }


  toggleFeatured(manufacturer: Manufacturer) {
    const originalStatus = manufacturer.manufactureFeaturedStatus;
    manufacturer.manufactureFeaturedStatus = manufacturer.manufactureFeaturedStatus === 0 ? 1 : 0;
    this.manufacturerService.updateManufacturerStatus(manufacturer).subscribe(
      (data) => {
        console.log('Featured status updated');
      },
      (error) => {
        console.error('Failed to update featured status', error);
        manufacturer.manufactureFeaturedStatus = originalStatus;
      }
    );
  }

  onDeleteSelected(manufactureId: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.manufacturerService.deleteManufacturer(manufactureId).subscribe(
          () => {
            this.manufacturers = this.manufacturers.filter(m => m.manufactureId !== manufactureId);
            this.snackBar.open('Manufacturer deleted successfully', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
          },
          (error) => {
            console.error('Failed to delete manufacturer', error);
            this.snackBar.open('Failed to delete manufacturer', 'Close', {
              duration: 3000,
              verticalPosition: 'bottom',
              horizontalPosition: 'center'
            });
          }
        );
      }
    });
  }
}
