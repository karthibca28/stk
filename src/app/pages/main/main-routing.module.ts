import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { DutyComponent } from './duty/duty.component';
import { UserComponent } from './user/user.component';
import { AssetComponent } from './asset/asset.component';
import { DutyPointsComponent } from './duty-points/duty-points.component';
import { DutyPointsFormComponent } from './duty-points-form/duty-points-form.component';
import { VIPRoutesComponent } from './vip-routes/vip-routes.component';
import { PoliceStationComponent } from './police-station/police-station.component';
import { BroadcastComponent } from './broadcast/broadcast.component';
import { BroadcastFormComponent } from './broadcast-form/broadcast-form.component';

const routes: Routes = [
  {
    path: 'taskList',
    component: TaskComponent
  },
  {
    path: 'dutyList',
    component: DutyComponent
  },
  {
    path: 'userList',
    component: UserComponent
  },
  {
    path: 'assetList',
    component: AssetComponent
  },
  {
    path: 'dutyPoints',
    component: DutyPointsComponent
  },
  {
    path: 'vip-Routes',
    component: VIPRoutesComponent
  },
  {
    path: 'policeStation',
    component: PoliceStationComponent
  },
  {
    path: 'dutPoints-form/:dutyPointId',
    component: DutyPointsFormComponent
  },
  {
    path: 'broadCast',
    component: BroadcastComponent
  },
  {
    path: 'broadCast-form',
    component: BroadcastFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
