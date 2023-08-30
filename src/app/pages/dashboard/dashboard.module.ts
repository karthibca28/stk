import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { ExploreAreaComponent } from './explore-area/explore-area.component';
import { VehicleBlacklistComponent } from './vehicle-blacklist/vehicle-blacklist.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { ApproveLocationComponent } from './approve-location/approve-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AddPersonBlacklistComponent } from './add-person-blacklist/add-person-blacklist.component';
import { AddVehicleBlacklistComponent } from './add-vehicle-blacklist/add-vehicle-blacklist.component';
import { BroadcastMessageViewComponent } from './broadcast-message-view/broadcast-message-view.component';
import { ImeiSearchComponent } from './imei-search/imei-search.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

@NgModule({
  declarations: [
    HomeComponent,
    AddNewLocationComponent,
    ExploreAreaComponent,
    VehicleBlacklistComponent,
    BroadcastMessageComponent,
    ApproveLocationComponent,
    ProfileComponent,
    AddPersonBlacklistComponent,
    AddVehicleBlacklistComponent,
    BroadcastMessageViewComponent,
    ImeiSearchComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class DashboardModule { }
