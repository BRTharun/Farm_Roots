import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { ProductInfoComponent } from './components/product-info/product-info.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';

const routes: Routes = [
//  { path: 'productinfo', component: ProductInfoComponent },
  { path: 'upload-pictures', component: PictureUploadComponent },
  { path: '', redirectTo: '', pathMatch: 'full' } // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
