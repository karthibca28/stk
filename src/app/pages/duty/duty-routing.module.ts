import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDutyComponent } from './view-duty/view-duty.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { DutyListComponent } from './duty-list/duty-list.component';
import { DefectiveSignalComponent } from './defective-signal/defective-signal.component';
import { DefectiveSignalListComponent } from './defective-signal-list/defective-signal-list.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { SOSListComponent } from './sos-list/sos-list.component';
import { SOSFormComponent } from './sos-form/sos-form.component';
import { ShoHomeComponent } from './sho-home/sho-home.component';

const routes: Routes = [
  {
    path: 'duty-list',
    component: DutyListComponent
  },
  {
    path: 'view-duty',
    component: ViewDutyComponent
  },
  {
    path: 'view-duty/:dutyId',
    component: ViewDutyComponent
  },
  {
    path: 'inventory-form',
    component: InventoryFormComponent
  },
  {
    path: 'inventory-list',
    component: InventoryListComponent
  },
  {
    path: 'defective-signal',
    component: DefectiveSignalComponent
  },
  {
    path: 'defective-signal-list',
    component: DefectiveSignalListComponent
  },
  {
    path: 'sos-list',
    component: SOSListComponent
  },
  {
    path: 'sos-form',
    component: SOSFormComponent
  },
  {
    path: 'sho-home',
    component: ShoHomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyRoutingModule { }
