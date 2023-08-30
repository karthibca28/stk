import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceRoutingModule } from './performance-routing.module';
import { ReportAdminComponent } from './report-admin/report-admin.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportSoComponent } from './report-so/report-so.component';
import { OverallReportComponent } from './overall-report/overall-report.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';

@NgModule({
  declarations: [
    ReportAdminComponent,
    ReportSoComponent,
    OverallReportComponent
  ],
  imports: [
    CommonModule,
    PerformanceRoutingModule,
    SharedModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PerformanceModule { }
