import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-sho-summary-report',
  templateUrl: './sho-summary-report.component.html',
  styleUrls: ['./sho-summary-report.component.scss']
})
export class ShoSummaryReportComponent implements OnInit {
  form: FormGroup;
  date: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  dynamaicDataForTable: any;
  reportType = [
    { id: 'task', name: 'Task' },
    { id: 'duty', name: 'Duty' }
  ];
  reportSubType = [
    { id: 'all', name: 'All' },
    { id: 'taskType', name: 'TASK TYPE' },
    { id: 'dutyType', name: 'DUTY TYPE' }
  ]

  constructor(private secondaryService: SecondaryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialForm();
    this.getDate();
    this.getList();
  }

  initialForm(){
    this.form = this.fb.group({
      dateFilter: [''],
      reportType: [''],
      reportSubType: ['']
    })
  }

  getDate(){
    this.secondaryService.getReportFilter().subscribe((res: any) => {
      this.date = res.data.dateFilters
    })
  }

  getList() {
    const dateFilter = this.form.value.dateFilter;
    const type = 'summary';
    const reportType = this.form.value.reportType;
    const reportSubType = this.form.value.reportSubType
    this.secondaryService.getReports(dateFilter, type, reportType, reportSubType).subscribe((res: any) => {
        const data = res.data;
        // const values = data.map((item: any) => ({
        //   ...item,
        //   name: item.createdBy.fullName,
        //   detail: item.generalIncident.incidentDetail
        // }));
        const cols = [
          { field: 'taskType', header: 'Task Type', type: 'text' },
          { field: '_count', header: 'Count', type: 'text' },
          // { field: 'policeStationName', header: 'Police Station', type: 'text' },
          // { field: 'detail', header: 'Details', type: 'text' },
          // { field: 'status', header: 'Status', type: 'text' },
        ];
        this.dynamaicDataForTable = {cols, data};
    });
  }

  pagination(data: any) {
    this.pageSize = data.pageSize,
    this.pageNumber = data.pageNumber
    this.getList();
  }

}