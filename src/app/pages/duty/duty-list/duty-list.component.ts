import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-duty-list',
  templateUrl: './duty-list.component.html',
  styleUrls: ['./duty-list.component.scss']
})
export class DutyListComponent implements OnInit {
  form: FormGroup
  dynamaicDataForTable: any;
  pageSize: number = 10;
  pageNumber: number = 1;
  date: any;
  status: any;

  constructor(private router: Router, private secondaryService: SecondaryService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initialForm();
    this.getList();
    this.getDate();
    this.status = [
      {
        id: 'ASSIGNED',
        name: 'ASSIGNED'
      },
      {
        id: 'STARTED',
        name: 'STARTED'
      },
      {
        id: 'SUBMITTED',
        name: 'SUBMITTED'
      },
      {
        id: 'APPROVED',
        name: 'APPROVED'
      },
      {
        id: 'REJECTED',
        name: 'REJECTED'
      },
    ]
  }

  initialForm(){
    this.form = this.fb.group({
      dateFilter: [''],
      status: ['']
    })
  }

  getDate(){
    this.secondaryService.getReportFilter().subscribe((res: any) => {
      this.date = res.data.dateFilters
    })
  }

  getList() {
    const dateFilter = this.form.value.dateFilter;
    const status = this.form.value.status
    this.secondaryService.getDuty(this.pageNumber, this.pageSize, status, dateFilter).subscribe((res: any) => {
        const data = res.data;
        const values = data.map((item: any) => ({
          ...item,
          name: item.assignedTo[0].name
        }));
        const cols = [
          { field: 'dutyType', header: 'Duty Type', type: 'text' },
          { field: 'name', header: 'Assigned To', type: 'text' },
          { field: 'startLocationName', header: 'Start Location', type: 'text' },
          { field: 'endLocationName', header: 'End Location', type: 'text' },
          { field: 'status', header: 'Status', type: 'text' },
        ];
        this.dynamaicDataForTable = {cols, values};
    });
  }

  pagination(data: any) {
    this.pageSize = data.pageSize,
    this.pageNumber = data.pageNumber
    this.getList();
  }

  viewRecord(dutyId:any){
    this.router.navigate([`main/duty/view-duty`,dutyId])
  }

  openForm() {
    this.router.navigate(['main/duty/view-duty']);
}

}
