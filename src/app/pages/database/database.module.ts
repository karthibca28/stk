import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DatabaseRoutingModule } from './database-routing.module';
import { DutyPointListComponent } from './duty-point-list/duty-point-list.component';
import { DutyPointFormComponent } from './duty-point-form/duty-point-form.component';
import { DynamicVechilePointComponent } from './dynamic-vechile-point/dynamic-vechile-point.component';
import { DynamicVechileFormComponent } from './dynamic-vechile-form/dynamic-vechile-form.component';
import { VipRouteListComponent } from './vip-route-list/vip-route-list.component';
import { VipRouteFormComponent } from './vip-route-form/vip-route-form.component';


@NgModule({
  declarations: [
    DutyPointListComponent,
    DutyPointFormComponent,
    DynamicVechilePointComponent,
    DynamicVechileFormComponent,
    VipRouteListComponent,
    VipRouteFormComponent
  ],
  imports: [
    CommonModule,
    DatabaseRoutingModule,
    PrimeModule,
    SharedModule, ReactiveFormsModule,
    MaterialModule
  ]
})
export class DatabaseModule { }
