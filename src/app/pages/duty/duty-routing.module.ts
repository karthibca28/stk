import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DutyFormComponent } from './duty-form/duty-form.component';
import { ViewDutyComponent } from './view-duty/view-duty.component';
import { VipRoutesComponent } from './vip-routes/vip-routes.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';

const routes: Routes = [
  {
    path: 'duty-form',
    component: DutyFormComponent
  },
  {
    path: 'view-duty',
    component: ViewDutyComponent
  },
  {
    path: 'vip-routes',
    component: VipRoutesComponent
  },
  {
    path: 'inventory-form',
    component: InventoryFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyRoutingModule { }
