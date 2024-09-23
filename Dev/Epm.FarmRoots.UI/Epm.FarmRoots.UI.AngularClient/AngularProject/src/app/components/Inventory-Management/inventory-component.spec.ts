import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, throwError } from 'rxjs';
import { InventoryComponent } from './inventory-component';
import { InventoryService } from '../../services/inventory.service';
import { Inventory } from '../../models/inventory.model';
import { ActivatedRoute, Router } from '@angular/router';

describe('InventoryComponent', () => {
  let component: InventoryComponent;
  let fixture: ComponentFixture<InventoryComponent>;
  let inventoryService: jasmine.SpyObj<InventoryService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;
  let mockActivatedRoute: any;

  beforeEach(async () => {
    inventoryService = jasmine.createSpyObj('InventoryService', ['getInventoryById', 'saveInventory']);
    snackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockActivatedRoute = {
      params: of({ id: 1 })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InventoryComponent],
      providers: [
        { provide: InventoryService, useValue: inventoryService },
        { provide: MatSnackBar, useValue: snackBar },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from the service', () => {
    const mockInventory: Inventory = {
      productId: 1,
      productStockQuantity: 100,
      productMinCartQuantity: 1,
      productMaxCartQuantity: 50
    };
    inventoryService.getInventoryById.and.returnValue(of(mockInventory));

    component.loadInventory(1);

    fixture.detectChanges();

    expect(component.inventoryForm.get('productStockQuantity')?.value).toBe(100);
    expect(component.inventoryForm.get('productMinCartQuantity')?.value).toBe(1);
    expect(component.inventoryForm.get('productMaxCartQuantity')?.value).toBe(50);
  });

  it('should show error message when loadInventory fails', () => {
    inventoryService.getInventoryById.and.returnValue(throwError(() => new Error('Failed to load inventory')));

    component.loadInventory(1);

    expect(snackBar.open).toHaveBeenCalledWith('Failed to load inventory', 'Close', { duration: 3000 });
  });

  it('should successfully save inventory when onSave is called and the form is valid', () => {
    component.inventoryForm.setValue({
      productId: 1,
      productStockQuantity: 100,
      productMinCartQuantity: 1,
      productMaxCartQuantity: 50
    });

    inventoryService.saveInventory.and.returnValue(of({} as Inventory));

    component.onSave();

    expect(snackBar.open).toHaveBeenCalledWith('Inventory updated successfully', 'Close', { duration: 3000 });
  });

});
