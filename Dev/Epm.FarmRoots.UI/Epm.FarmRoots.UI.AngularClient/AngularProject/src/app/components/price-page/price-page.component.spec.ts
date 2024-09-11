import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PricePageComponent } from './price-page.component';
import { PriceService } from '../../services/price.service';
import { of, throwError } from 'rxjs';

describe('PricePageComponent', () => {
  let component: PricePageComponent;
  let fixture: ComponentFixture<PricePageComponent>;
  let priceServiceMock: any;

  beforeEach(async () => {
    priceServiceMock = jasmine.createSpyObj('PriceService', ['savePrice', 'updatePrice']);
    await TestBed.configureTestingModule({
      declarations: [PricePageComponent],
      imports: [ReactiveFormsModule, FormsModule],
      providers: [{ provide: PriceService, useValue: priceServiceMock }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PricePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.priceForm).toBeTruthy();
    expect(component.priceForm.controls['salePrice']).toBeTruthy();
  });

  it('form should be invalid when empty', () => {
    expect(component.priceForm.valid).toBeFalsy();
  });

  it('should call savePrice on submit if form is valid', () => {
    priceServiceMock.savePrice.and.returnValue(of({}));
    component.priceForm.patchValue({
      salePrice: 90,
      mrp: 100,
      specialPrice: 80,
      fromDate: '2021-01-01',
      toDate: '2021-01-10',
      discount: 10,
      productCost: 70,
      productId: 1
    });
    component.onSubmit();
    expect(priceServiceMock.savePrice).toHaveBeenCalled();
  });

  it('should not call savePrice if form is invalid', () => {
    component.onSubmit();
    expect(priceServiceMock.savePrice).not.toHaveBeenCalled();
  });

  it('should validate special price correctly', () => {
    component.priceForm.patchValue({
      salePrice: 100,
      mrp: 150,
      specialPrice: 160
    });
    fixture.detectChanges(); // Trigger validation
    expect(component.priceForm.invalid).toBeTruthy();
    expect(component.priceForm.errors).toEqual({ specialPriceError: 'Special price must be less than both sale price and MRP.' });
  });

  it('should validate date range correctly', () => {
    component.priceForm.patchValue({
      fromDate: '2021-01-10',
      toDate: '2021-01-01'
    });
    fixture.detectChanges(); // Trigger validation
    expect(component.priceForm.invalid).toBeTruthy();
    expect(component.priceForm.errors).toEqual({ dateRange: 'End date should be greater than start date.' });
  });

  it('should handle savePrice service call failure', () => {
    priceServiceMock.savePrice.and.returnValue(throwError(new Error('Failed to save data!')));
    spyOn(window, 'alert');
    component.onSubmit();
    fixture.detectChanges();
    expect(window.alert).toHaveBeenCalledWith('Failed to save data!');
  });

  it('should handle updatePrice service call', () => {
    priceServiceMock.updatePrice.and.returnValue(of({}));
    component.savedPriceData = { priceId: 1 } as any; // Mock saved data
    component.priceForm.patchValue({
      salePrice: 90,
      mrp: 100,
      specialPrice: 85,
      fromDate: '2021-01-01',
      toDate: '2021-01-10',
      discount: 5,
      productCost: 80,
      productId: 1
    });
    component.onSaveAndEdit();
    expect(priceServiceMock.updatePrice).toHaveBeenCalledWith(1, jasmine.any(Object));
  });
});
