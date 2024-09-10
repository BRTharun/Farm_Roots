import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { ProductInfoComponent } from './components/productinfo/productinfo.component';
import { PricePageComponent } from './components/price-page/price-page.component';
import { ManufacturerMappingsComponent } from './components/manufacturer-mappings/manufacture-mapping.component';
import { InventoryComponent } from './components/Inventory-Management/inventory-component';

const routes: Routes = [
    { path: 'price', component: PricePageComponent },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'statistics', component: StatisticsComponent },
  { path: 'productinfo', component: ProductInfoComponent },
  { path: 'manufacturermapping', component: ManufacturerMappingsComponent },
  {path: 'inventorymanagement', component : InventoryComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
