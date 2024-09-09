import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PictureUploadComponent } from './components/picture-upload/picture-upload.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'upload', component: PictureUploadComponent },
  { path: '**', redirectTo: '' }  // Redirect unknown routes to home
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
