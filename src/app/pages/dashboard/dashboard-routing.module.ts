import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { AddPersonBlacklistComponent } from './add-person-blacklist/add-person-blacklist.component';
import { AddVehicleBlacklistComponent } from './add-vehicle-blacklist/add-vehicle-blacklist.component';
import { ApproveLocationComponent } from './approve-location/approve-location.component';
import { BroadcastMessageViewComponent } from './broadcast-message-view/broadcast-message-view.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { ExploreAreaComponent } from './explore-area/explore-area.component';
import { HomeComponent } from './home/home.component';
import { ImeiSearchComponent } from './imei-search/imei-search.component';
import { ProfileComponent } from './profile/profile.component';
import { VehicleBlacklistComponent } from './vehicle-blacklist/vehicle-blacklist.component';
import { DlChecksComponent } from './dl-checks/dl-checks.component';

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
    path:'explore-area',
    component:ExploreAreaComponent
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
    path:'add-person-blacklist',
    component:AddPersonBlacklistComponent
  },
  {
    path:'add-person-blacklist/:personBId',
    component:AddPersonBlacklistComponent
  },
  {
    path:'vehicle-blacklist',
    component:VehicleBlacklistComponent
  },
  {
    path:'add-vehicle-blacklist',
    component:AddVehicleBlacklistComponent
  },
  {
    path:'add-vehicle-blacklist/:vehicleBId',
    component:AddVehicleBlacklistComponent
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
