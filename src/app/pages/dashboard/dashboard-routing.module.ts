import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { ApproveLocationComponent } from './approve-location/approve-location.component';
import { BroadcastMessageViewComponent } from './broadcast-message-view/broadcast-message-view.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { HomeComponent } from './home/home.component';
import { ImeiSearchComponent } from './imei-search/imei-search.component';
import { ProfileComponent } from './profile/profile.component';
import { VehicleBlacklistComponent } from './vehicle-blacklist/vehicle-blacklist.component';
import { DlChecksComponent } from './dl-checks/dl-checks.component';
import { AttendanceHistoryComponent } from './attendance-history/attendance-history.component';
import { AttendanceAddComponent } from './attendance-add/attendance-add.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'new-location',
    component:AddNewLocationComponent
  },
  {
    path:'new-location/:locId',
    component:AddNewLocationComponent
  },
  {
    path:'approve-location',
    component:ApproveLocationComponent
  },
  {
    path:'broadcast-message',
    component:BroadcastMessageComponent
  },
  {
    path:'broadcast-message-view',
    component:BroadcastMessageViewComponent
  },
  {
    path:'vehicle-blacklist',
    component:VehicleBlacklistComponent
  },
  {
    path:'profile',
    component:ProfileComponent
  },
  {
    path: 'imei-search',
    component: ImeiSearchComponent
  },
  {
    path: 'dl-checks',
    component: DlChecksComponent
  },
  {
    path: 'attentanceHistory',
    component: AttendanceHistoryComponent
  },
  {
    path: 'attentanceAdd',
    component: AttendanceAddComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
