import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DutyRoutingModule } from './duty-routing.module';
import { DutyFormComponent } from './duty-form/duty-form.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ViewDutyComponent } from './view-duty/view-duty.component';
import { VipRoutesComponent } from './vip-routes/vip-routes.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';


@NgModule({
  declarations: [
    DutyFormComponent,
    ViewDutyComponent,
    VipRoutesComponent,
    InventoryFormComponent,
  ],
  imports: [
    CommonModule,
    DutyRoutingModule,
    PrimeModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaterialTimepickerModule
  ]
})
export class DutyModule { }
