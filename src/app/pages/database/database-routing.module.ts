import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DutyPointFormComponent } from './duty-point-form/duty-point-form.component';
import { DutyPointListComponent } from './duty-point-list/duty-point-list.component';
import { DynamicVechileFormComponent } from './dynamic-vechile-form/dynamic-vechile-form.component';
import { DynamicVechilePointComponent } from './dynamic-vechile-point/dynamic-vechile-point.component';
import { VipRouteListComponent } from './vip-route-list/vip-route-list.component';
import { VipRouteFormComponent } from './vip-route-form/vip-route-form.component';

const routes: Routes = [
  {
    path: 'duty-point-form',
    component: DutyPointFormComponent
  },
  {
    path: 'duty-point-form/:dutyPointId',
    component: DutyPointFormComponent
  },
  {
    path: 'duty-point',
    component: DutyPointListComponent
  },
  {
    path: 'dynamic-vechile-form',
    component: DynamicVechileFormComponent
  },
  {
    path: 'dynamic-vechile-form/:vehiclePointId',
    component: DynamicVechileFormComponent
  },
  {
    path: 'dynamic-vechile',
    component: DynamicVechilePointComponent
  },
  {
    path: 'vip-route',
    component: VipRouteListComponent
  },
  {
    path: 'vip-route-form',
    component: VipRouteFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatabaseRoutingModule { }
