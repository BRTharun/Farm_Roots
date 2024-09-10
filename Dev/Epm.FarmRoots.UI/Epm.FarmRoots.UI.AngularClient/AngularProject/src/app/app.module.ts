import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../app/components/ConfirmationDialog/confirmation-dialog.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InventoryComponent } from './components/Inventory-Management/inventory-component';
import { ManufacturerMappingsComponent } from './components/manufacturer-mappings/manufacture-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    InventoryComponent,
    ManufacturerMappingsComponent
  ],
  imports: [
    BrowserModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
