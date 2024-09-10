import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PricePageComponent } from './components/price-page/price-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/price', pathMatch: 'full' },  // Redirect to /price by default
  { path: 'price', component: PricePageComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
