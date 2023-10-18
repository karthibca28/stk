import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SoRoutingModule } from './so-routing.module';
import { SoHomeComponent } from './so-home/so-home.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SoBeatComponent } from './so-beat/so-beat.component';
import { SoUserComponent } from './so-user/so-user.component';
import { SoLocationComponent } from './so-location/so-location.component';
import { SoTaskComponent } from './so-task/so-task.component';
import { SoDutyComponent } from './so-duty/so-duty.component';
import { SoUserActiveComponent } from './so-user-active/so-user-active.component';
import { SoUserInactiveComponent } from './so-user-inactive/so-user-inactive.component';

@NgModule({
  declarations: [
    SoHomeComponent,
    SoBeatComponent,
    SoUserComponent,
    SoLocationComponent,
    SoTaskComponent,
    SoDutyComponent,
    SoUserActiveComponent,
    SoUserInactiveComponent,
  ],
  imports: [
    CommonModule,
    SoRoutingModule,
    PrimeModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class SoModule { }
