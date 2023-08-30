import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ZoneFormComponent } from './zone-form/zone-form.component';
import { ZoneListComponent } from './zone-list/zone-list.component';
import { RangeFormComponent } from './range-form/range-form.component';
import { RangeListComponent } from './range-list/range-list.component';
import { DistrictFormComponent } from './district-form/district-form.component';
import { DistrictListComponent } from './district-list/district-list.component';
import { SubDivisionFormComponent } from './sub-division-form/sub-division-form.component';
import { SubDivisionListComponent } from './sub-division-list/sub-division-list.component';
import { PoliceStationFormComponent } from './police-station-form/police-station-form.component';
import { PoliceStationListComponent } from './police-station-list/police-station-list.component';
import { StateFormComponent } from './state-form/state-form.component';
import { StateListComponent } from './state-list/state-list.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdministrationAddComponent } from './administration-add/administration-add.component';

const routes: Routes = [
  {
    path: 'administration',
    component: AdministrationComponent
  },
  {
    path: 'administration-form',
    component: AdministrationAddComponent
  },
  {
    path: 'zone-form',
    component: ZoneFormComponent
  },
  {
    path: 'zone-form/:zoneId',
    component: ZoneFormComponent
  },
  {
    path: 'zone-list',
    component: ZoneListComponent
  },
  {
    path: 'range-form',
    component: RangeFormComponent
  },
  {
    path: 'range-form/:rangeId',
    component: RangeFormComponent
  },
  {
    path: 'range-list',
    component: RangeListComponent
  },
  {
    path: 'district-form',
    component: DistrictFormComponent
  },
  {
    path: 'district-form/:distId',
    component: DistrictFormComponent
  },
  {
    path: 'district-list',
    component: DistrictListComponent
  },
  {
    path: 'sub-division-form',
    component: SubDivisionFormComponent
  },
  {
    path: 'sub-division-form/:subdivId',
    component: SubDivisionFormComponent
  },
  {
    path: 'sub-division-list',
    component: SubDivisionListComponent
  },
  {
    path: 'police-station-form',
    component: PoliceStationFormComponent
  },
  {
    path: 'police-station-form/:pstatId',
    component: PoliceStationFormComponent
  },
  {
    path: 'police-station-list',
    component: PoliceStationListComponent
  },
  {
    path: 'state-form',
    component: StateFormComponent
  },
  {
    path: 'state-form/:stateId',
    component: StateFormComponent
  },
  {
    path: 'state-list',
    component: StateListComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }