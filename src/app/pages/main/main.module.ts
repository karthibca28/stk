import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainRoutingModule } from './main-routing.module';
import { TaskComponent } from './task/task.component';
import { DutyComponent } from './duty/duty.component';
import { UserComponent } from './user/user.component';
import { AssetComponent } from './asset/asset.component';
import { DutyPointsComponent } from './duty-points/duty-points.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
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
import { NgxAudioPlayerModule } from 'ngx-audio-player';


@NgModule({
  declarations: [
    TaskComponent,
    DutyComponent,
    UserComponent,
    AssetComponent,
    DutyPointsComponent,
    DutyPointsFormComponent,
    VIPRoutesComponent,
    PoliceStationComponent,
    BroadcastComponent,
    BroadcastFormComponent,
    InventoryComponent,
    ViewBroadcastComponent,
    SosAlertComponent,
    AlertComponent,
    ViewTaskComponent,
    ViewDutyComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimeModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxAudioPlayerModule
  ]
})
export class MainModule { }
