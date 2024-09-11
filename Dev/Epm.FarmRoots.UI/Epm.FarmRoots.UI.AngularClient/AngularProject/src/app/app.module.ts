import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
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
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CaptchaComponent } from './components/captcha/captcha.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component'; 
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Required for toastr
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/*import { SidenavComponent } from './components/sidenav/sidenav.component'; // Import ToastrModule*/

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
    ManufacturerMappingsComponent,
    FooterComponent,
    HeaderComponent,
    CaptchaComponent,
    ChangePasswordComponent,
    EditProfileComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
    AppComponent,
    SidenavComponent,
    PictureUploadComponent,
    HomeComponent,
    SidenavComponent
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
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule, // Initialize ToastrModule
  ],

  providers: [ProductService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
