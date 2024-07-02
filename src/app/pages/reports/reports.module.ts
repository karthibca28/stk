import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from './reports-routing.module';
import { MisReportsComponent } from './mis-reports/mis-reports.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SpdutyReportComponent } from './spduty-report/spduty-report.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { SpdutySummaryComponent } from './spduty-summary/spduty-summary.component';
import { TaskSummaryComponent } from './task-summary/task-summary.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { AdminDetailReportComponent } from './admin-detail-report/admin-detail-report.component';
import { BeatSummaryComponent } from './beat-summary/beat-summary.component';
import { ImpStateSummaryComponent } from './imp-state-summary/imp-state-summary.component';
import { ImpDistrictSummaryComponent } from './imp-district-summary/imp-district-summary.component';
import { ImpPsSummaryComponent } from './imp-ps-summary/imp-ps-summary.component';
import { SoSummaryReportComponent } from './so-summary-report/so-summary-report.component';
import { SoDetailReportComponent } from './so-detail-report/so-detail-report.component';
import { SoDatewiseReportComponent } from './so-datewise-report/so-datewise-report.component';
import { SoActivitysummaryReportComponent } from './so-activitysummary-report/so-activitysummary-report.component';
import { SoLocationReportComponent } from './so-location-report/so-location-report.component';
import { DaDistReportComponent } from './da-dist-report/da-dist-report.component';
import { ShoSummaryReportComponent } from './sho-summary-report/sho-summary-report.component';
import { ShoDetailReportComponent } from './sho-detail-report/sho-detail-report.component';


@NgModule({
  declarations: [
    MisReportsComponent,
    SpdutyReportComponent,
    TaskReportComponent,
    SpdutySummaryComponent,
    TaskSummaryComponent,
    AdminReportComponent,
    AdminDetailReportComponent,
    BeatSummaryComponent,
    ImpStateSummaryComponent,
    ImpDistrictSummaryComponent,
    ImpPsSummaryComponent,
    SoSummaryReportComponent,
    SoDetailReportComponent,
    SoDatewiseReportComponent,
    SoActivitysummaryReportComponent,
    SoLocationReportComponent,
    DaDistReportComponent,
    ShoSummaryReportComponent,
    ShoDetailReportComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule,
    PrimeModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ReportsModule { }
