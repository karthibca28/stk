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
import { DutyListComponent } from './duty-list/duty-list.component';
import { DutyPointsFormComponent } from './duty-points-form/duty-points-form.component';
import { DynamicVechileListComponent } from './dynamic-vechile-list/dynamic-vechile-list.component';
import { VipRoutesListComponent } from './vip-routes-list/vip-routes-list.component';
import { DutyPointListComponent } from './duty-point-list/duty-point-list.component';
import { DefectiveSignalListComponent } from './defective-signal-list/defective-signal-list.component';
import { DefectiveSignalComponent } from './defective-signal/defective-signal.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { SOSListComponent } from './sos-list/sos-list.component';
import { SOSFormComponent } from './sos-form/sos-form.component';
import { DutyPointViewComponent } from './duty-point-view/duty-point-view.component';
import { ShoHomeComponent } from './sho-home/sho-home.component';


@NgModule({
  declarations: [
    DutyFormComponent,
    ViewDutyComponent,
    VipRoutesComponent,
    InventoryFormComponent,
    DutyListComponent,
    DutyPointsFormComponent,
    DynamicVechileListComponent,
    VipRoutesListComponent,
    DutyPointListComponent,
    DefectiveSignalListComponent,
    DefectiveSignalComponent,
    InventoryListComponent,
    SOSListComponent,
    SOSFormComponent,
    DutyPointViewComponent,
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
