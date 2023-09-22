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
  DutyItems: any[] = [];  
  selected ='all'

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
    this.getDutySummary()
  }
  onSelectionChange(event: any) {
    this.selected = event.value;
    this.getList();
  }
  
  getList() {
    this.formService.getDutyforSeniorOfficer(this.selected).subscribe((formData: any) => {
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

  getDutySummary() {
    this.formService.getDutySummaryforSeniorOfficer().subscribe((formData: any) => {
      this.DutyItems = [
        {
          type: this.replaceUnderscores(formData.data.TRAFFIC_DUTY.type),
          imageSrc: '../../../../assets/Duty/icons8-check-book-48.png',
          count: formData.data.TRAFFIC_DUTY.count
        },
        {
          type: this.replaceUnderscores(formData.data.VEHICLE_POINT.type),
          imageSrc: '../../../../assets/Duty/icons8-traffic-48.png',
          count: formData.data.VEHICLE_POINT.count
        },
        {
          type: this.replaceUnderscores(formData.data.GENERAL_CHECK.type),
          imageSrc: '../../../../assets/Duty/icons8-traffic-jam-48.png',
          count: formData.data.GENERAL_CHECK.count
        },
        {
          type: this.replaceUnderscores(formData.data.VIP_ROUTES.type),
          imageSrc: '../../../../assets/Duty/icons8-vip-48.png',
          count: formData.data.VIP_ROUTES.count
        }
      ];
    });
  }
  
  replaceUnderscores(type: string): string {
    return type.replace(/_/, '-'); // Replace underscores with spaces in the type
  }
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
