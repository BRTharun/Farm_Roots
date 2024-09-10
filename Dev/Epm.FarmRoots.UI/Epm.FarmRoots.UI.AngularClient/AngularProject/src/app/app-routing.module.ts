import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProductInfoComponent } from './components/productinfo/productinfo.component';

import { PricePageComponent } from './components/price-page/price-page.component';

const routes: Routes = [
    { path: 'price', component: PricePageComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'statistics', component: StatisticsComponent },
    { path: 'productinfo', component: ProductInfoComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
