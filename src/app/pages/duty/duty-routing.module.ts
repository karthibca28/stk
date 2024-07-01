import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DutyFormComponent } from './duty-form/duty-form.component';
import { ViewDutyComponent } from './view-duty/view-duty.component';
import { VipRoutesComponent } from './vip-routes/vip-routes.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { DutyListComponent } from './duty-list/duty-list.component';
import { DutyPointsFormComponent } from './duty-points-form/duty-points-form.component';
import { DynamicVechileListComponent } from './dynamic-vechile-list/dynamic-vechile-list.component';
import { VipRoutesListComponent } from './vip-routes-list/vip-routes-list.component';
import { DutyPointListComponent } from './duty-point-list/duty-point-list.component';
import { DefectiveSignalComponent } from './defective-signal/defective-signal.component';
import { DefectiveSignalListComponent } from './defective-signal-list/defective-signal-list.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { SOSListComponent } from './sos-list/sos-list.component';
import { SOSFormComponent } from './sos-form/sos-form.component';
import { DutyPointViewComponent } from './duty-point-view/duty-point-view.component';
import { ShoHomeComponent } from './sho-home/sho-home.component';

const routes: Routes = [
  {
    path: 'duty-form',
    component: DutyFormComponent
  },
  {
    path: 'duty-form/:vehiclePointId',
    component: DutyFormComponent
  },
  {
    path: 'duty-list',
    component: DutyListComponent
  },
  {
    path: 'duty-points-form',
    component: DutyPointsFormComponent
  },
  {
    path: 'duty-points-form/:dutyPointId',
    component: DutyPointsFormComponent
  },
  {
    path: 'duty-points-view',
    component: DutyPointViewComponent
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
    path: 'vip-routes',
    component: VipRoutesComponent
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
    path: 'dynamic-vechile-point',
    component: DynamicVechileListComponent
  },
  {
    path: 'vip-route-list',
    component: VipRoutesListComponent
  },
  {
    path: 'duty-point-list',
    component: DutyPointListComponent
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
