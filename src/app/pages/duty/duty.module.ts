import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { DutyRoutingModule } from './duty-routing.module';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ViewDutyComponent } from './view-duty/view-duty.component';
import { InventoryFormComponent } from './inventory-form/inventory-form.component';
import { DutyListComponent } from './duty-list/duty-list.component';
import { DefectiveSignalListComponent } from './defective-signal-list/defective-signal-list.component';
import { DefectiveSignalComponent } from './defective-signal/defective-signal.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { SOSListComponent } from './sos-list/sos-list.component';
import { SOSFormComponent } from './sos-form/sos-form.component';
import { ShoHomeComponent } from './sho-home/sho-home.component';


@NgModule({
  declarations: [
    ViewDutyComponent,
    InventoryFormComponent,
    DutyListComponent,
    DefectiveSignalListComponent,
    DefectiveSignalComponent,
    InventoryListComponent,
    SOSListComponent,
    SOSFormComponent,
    ShoHomeComponent,
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
