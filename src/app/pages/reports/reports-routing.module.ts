import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDetailReportComponent } from './admin-detail-report/admin-detail-report.component';
import { AdminReportComponent } from './admin-report/admin-report.component';
import { BeatSummaryComponent } from './beat-summary/beat-summary.component';
import { DaDistReportComponent } from './da-dist-report/da-dist-report.component';
import { ImpDistrictSummaryComponent } from './imp-district-summary/imp-district-summary.component';
import { ImpPsSummaryComponent } from './imp-ps-summary/imp-ps-summary.component';
import { ImpStateSummaryComponent } from './imp-state-summary/imp-state-summary.component';
import { MisReportsComponent } from './mis-reports/mis-reports.component';
import { SoActivitysummaryReportComponent } from './so-activitysummary-report/so-activitysummary-report.component';
import { SoDatewiseReportComponent } from './so-datewise-report/so-datewise-report.component';
import { SoDetailReportComponent } from './so-detail-report/so-detail-report.component';
import { SoLocationReportComponent } from './so-location-report/so-location-report.component';
import { SoSummaryReportComponent } from './so-summary-report/so-summary-report.component';
import { SpdutyReportComponent } from './spduty-report/spduty-report.component';
import { SpdutySummaryComponent } from './spduty-summary/spduty-summary.component';
import { TaskReportComponent } from './task-report/task-report.component';
import { TaskSummaryComponent } from './task-summary/task-summary.component';

const routes: Routes = [
  {
    path:'admin-report',
    component: AdminReportComponent
  },
  {
    path:'admin-detail-report',
    component: AdminDetailReportComponent
  },
  {
    path:'mis-reports',
    component: MisReportsComponent
  },
  {
    path:'beat-summary',
    component: BeatSummaryComponent
  },
  {
    path: 'spduty-report',
    component: SpdutyReportComponent
  },
  {
    path: 'spduty-summary',
    component: SpdutySummaryComponent
  },
  {
    path: 'task-report',
    component: TaskReportComponent
  },
  {
    path: 'task-summary',
    component: TaskSummaryComponent
  },
  {
    path: 'state-summary',
    component: ImpStateSummaryComponent
  },
  {
    path: 'district-summary',
    component: ImpDistrictSummaryComponent
  },
  {
    path: 'ps-summary',
    component: ImpPsSummaryComponent
  },
  {
    path: 'soSummaryReport',
    component: SoSummaryReportComponent
  },
  {
    path: 'soDetailReport',
    component: SoDetailReportComponent
  },
  {
    path: 'DatewiseReport',
    component: SoDatewiseReportComponent
  },
  {
    path: 'activitySummary',
    component: SoActivitysummaryReportComponent
  },
  {
    path: 'locationReport',
    component: SoLocationReportComponent
  },
  {
    path: 'distReport',
    component: DaDistReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
