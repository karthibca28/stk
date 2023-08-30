import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportAdminComponent } from './report-admin/report-admin.component';
import { ReportSoComponent } from './report-so/report-so.component';
import { OverallReportComponent } from './overall-report/overall-report.component';

const routes: Routes = [
  {
    path: 'performReport',
    component: ReportAdminComponent
  },
  {
    path: 'report',
    component: ReportSoComponent
  },
  {
    path: 'overall',
    component: OverallReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformanceRoutingModule { }
