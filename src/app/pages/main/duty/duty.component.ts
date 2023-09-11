import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable :any
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.formService.getDutyforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data)
      const cols = [
        { field: 'dutyType', header: 'Duty Type', type: 'text' },
        { field: 'status', header: 'Status', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
        { field: 'startLocationName', header: 'Start Location Name', type: 'text' },
        { field: 'endLocationName', header: 'End Location Name', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
  });
  }
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
