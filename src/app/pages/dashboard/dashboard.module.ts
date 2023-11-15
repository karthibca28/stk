import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { AddNewLocationComponent } from './add-new-location/add-new-location.component';
import { VehicleBlacklistComponent } from './vehicle-blacklist/vehicle-blacklist.component';
import { BroadcastMessageComponent } from './broadcast-message/broadcast-message.component';
import { ApproveLocationComponent } from './approve-location/approve-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { BroadcastMessageViewComponent } from './broadcast-message-view/broadcast-message-view.component';
import { ImeiSearchComponent } from './imei-search/imei-search.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DlChecksComponent } from './dl-checks/dl-checks.component';

@NgModule({
  declarations: [
    HomeComponent,
    AddNewLocationComponent,
    VehicleBlacklistComponent,
    BroadcastMessageComponent,
    ApproveLocationComponent,
    ProfileComponent,
    BroadcastMessageViewComponent,
    ImeiSearchComponent,
    DlChecksComponent
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
