import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterRoutingModule } from './master-routing.module';
import { PoliceStationFormComponent } from './police-station-form/police-station-form.component';
import { PoliceStationListComponent } from './police-station-list/police-station-list.component';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { StateFormComponent } from './state-form/state-form.component';
import { StateListComponent } from './state-list/state-list.component';
import { RangeFormComponent } from './range-form/range-form.component';
import { RangeListComponent } from './range-list/range-list.component';
import { DistrictFormComponent } from './district-form/district-form.component';
import { DistrictListComponent } from './district-list/district-list.component';
import { SubDivisionFormComponent } from './sub-division-form/sub-division-form.component';
import { SubDivisionListComponent } from './sub-division-list/sub-division-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from './administration/administration.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { AdministrationAddComponent } from './administration-add/administration-add.component';

@NgModule({
  declarations: [
    PoliceStationFormComponent,
    PoliceStationListComponent,
    ZoneFormComponent,
    ZoneListComponent,
    StateFormComponent,
    StateListComponent,
    RangeFormComponent,
    RangeListComponent,
    DistrictFormComponent,
    DistrictListComponent,
    SubDivisionFormComponent,
    SubDivisionListComponent,
    AdministrationComponent,
    AdministrationAddComponent,
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    PrimeModule,
    MaterialModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class MasterModule { }