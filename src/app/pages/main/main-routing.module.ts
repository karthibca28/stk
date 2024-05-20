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
import { InventoryComponent } from './inventory/inventory.component';
import { ViewBroadcastComponent } from './view-broadcast/view-broadcast.component';
import { SosAlertComponent } from './sos-alert/sos-alert.component';
import { AlertComponent } from './alert/alert.component';
import { ViewTaskComponent } from './view-task/view-task.component';
import { ViewDutyComponent } from './view-duty/view-duty.component';
import { LiveUsersComponent } from './live-users/live-users.component';
import { SosAlertViewComponent } from './sos-alert-view/sos-alert-view.component';

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
    path: 'view-broadCast',
    component: ViewBroadcastComponent
  },
  {
    path: 'view-broadCast/:broadcastId',
    component: ViewBroadcastComponent
  },
  {
    path: 'broadCast-form',
    component: BroadcastFormComponent
  },
  {
    path: 'inventory',
    component: InventoryComponent
  },
  {
    path: 'sos-alert',
    component: SosAlertComponent
  },
  {
    path: 'sos-alert-view',
    component: SosAlertViewComponent
  },
  {
    path: 'sos-alert-view/:sosAlertId',
    component: SosAlertViewComponent
  },
  {
    path: 'alert',
    component: AlertComponent
  },
  {
    path: 'view-task',
    component: ViewTaskComponent
  },
  {
    path: 'view-task/:taskId',
    component: ViewTaskComponent
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
    path: 'live-user',
    component: LiveUsersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
