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

@NgModule({
  declarations: [
    TaskComponent,
    DutyComponent,
    UserComponent,
    AssetComponent,
    DutyPointsComponent,
    DutyPointsFormComponent,
    VIPRoutesComponent,
    PoliceStationComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    PrimeModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class MainModule { }
