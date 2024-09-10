import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BodyComponent } from './components/body/body.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProductService } from './services/product.service';
import { ProductInfoComponent } from './components/productinfo/productinfo.component';
import { ImagesComponent } from './components/images/images.component';
import { CategorymappingComponent } from './components/categorymapping/categorymapping.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../app/components/ConfirmationDialog/confirmation-dialog.component'
import { InventoryComponent } from './components/Inventory-Management/inventory-component';
import { ManufacturerMappingsComponent } from './components/manufacturer-mappings/manufacture-mapping.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PricePageComponent } from './components/price-page/price-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PricePageComponent,
    BodyComponent,
    SidenavComponent,
    StatisticsComponent,
    ProductInfoComponent,
    ImagesComponent,
    CategorymappingComponent,
    ConfirmationDialogComponent,
    InventoryComponent,
    ManufacturerMappingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatDialogModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [ProductService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
