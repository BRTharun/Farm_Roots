import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProductInfoComponent } from './components/productinfo/productinfo.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PricePageComponent } from './components/price-page/price-page.component';
import { ManufacturerMappingsComponent } from './components/manufacturer-mappings/manufacture-mapping.component';
import { InventoryComponent } from './components/Inventory-Management/inventory-component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { LoginComponent } from './components/login/login.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';


const routes: Routes = [
    { path: 'price', component: PricePageComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'statistics', component: StatisticsComponent },
  { path: 'productinfo', component: ProductInfoComponent },
  { path: 'manufacturermapping', component: ManufacturerMappingsComponent },
  {path: 'inventorymanagement', component : InventoryComponent},
  { path: 'statistics', component: StatisticsComponent },
  { path: 'productinfo', component: ProductInfoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload-pictures', component: PictureUploadComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
