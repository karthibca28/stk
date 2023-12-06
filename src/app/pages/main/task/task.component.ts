import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  TaskItems:any[]=[];
  pageNumber:number
  dynamaicDataForTable:any
  currentPageNumber: number | undefined = 1;
  selected = 'all';
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
    this.getTaskSummary();
  }

  onSelectionChange(event: any) {
    this.selected = event.value;
    this.getList();  
  }
  onPageChange(event: any) {
    this.pageNumber = event.first / event.rows + 1;
  }
  getList() {
    this.formService.getTaskforSeniorOfficer(this.selected).subscribe((formData: any) => {
      const values = formData.data;
      const cols = [
        { field: 'taskType', header: 'Task Type', type: 'text' },
        { field: 'challan', header: 'Challan', type: 'text' },
        { field: 'vehicleNumber', header: 'Vehicle Number', type: 'text' }, 
        { field: 'vehicleType', header: 'Vehicle Type', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
      ];

      values.forEach((value) => {
        value.vehicleNumber = value.abandonedVehicle?.vehicleNumber; 
        value.vehicleType = value.abandonedVehicle?.vehicleType; 
      });
  
      this.dynamaicDataForTable = { cols, values };
      console.log("masters",this.dynamaicDataForTable)
    });
  }
  getTaskSummary() {
    this.formService.getTaskSummaryforSeniorOfficer().subscribe((formData: any) => {
      this.TaskItems = [
        {
          type: this.replaceUnderscores(formData.data.RC_DL_CHECK?.type),
          imageSrc: '../../../../assets/task/RC_DL_CHECK.png',
          count: formData.data.RC_DL_CHECK?.count
        },
        {
          type: this.replaceUnderscores(formData.data.ACCIDENT_REPORT?.type),
          imageSrc: '../../../../assets/task/ACCIDENT_REPORT.png',
          count: formData.data.ACCIDENT_REPORT?.count
        },
        {
          type: this.replaceUnderscores(formData.data.GENERAL_VIOLATER_REPORT?.type),
          imageSrc: '../../../../assets/task/GENERAL_VIOLATER_REPORT.png',
          count: formData.data.GENERAL_VIOLATER_REPORT?.count
        },
        {
          type: this.replaceUnderscores(formData.data.CHALLAN?.type),
          imageSrc: '../../../../assets/task/Challan Machile.png',
          count: formData.data.CHALLAN?.count
        },
        {
          type: this.replaceUnderscores(formData.data.GENERAL_INCIDENT_REPORT?.type),
          imageSrc: '../../../../assets/task/ENCROACHMENT_REPORT.png',
          count: formData.data.GENERAL_INCIDENT_REPORT?.count
        },
        {
          type: this.replaceUnderscores(formData.data.ROAD_INCIDENT_REPORT?.type),
          imageSrc: './../../../assets/task/ROAD_INCIDENT_REPORT.png',
          count: formData.data.ROAD_INCIDENT_REPORT?.count
        },
        {
          type: this.replaceUnderscores(formData.data.ENCROACHMENT_REPORT?.type),
          imageSrc: '../../../../assets/task/ENCROACHMENT_REPORT.png',
          count: formData.data.ENCROACHMENT_REPORT?.count
        },
        {
          type: this.replaceUnderscores(formData.data.ABANDONED_VEHICLE?.type),
          imageSrc: '../../../../assets/task/ABANDONED_VEHICLE.png',
          count: formData.data.ABANDONED_VEHICLE?.count
        }
      ];
    });
  }
  
  replaceUnderscores(type: string): string {
    return type?.replace(/_/g, '-'); 
  }
  
  
  
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
