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
    this.getList();  // Call the getList() function when selection changes
  }
  
  getList() {
    console.log('Selected value:', this.selected);
    this.formService.getTaskforSeniorOfficer(this.selected).subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data);
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
      console.log("master", this.dynamaicDataForTable);
    });
  }
  getTaskSummary() {
    this.formService.getTaskSummaryforSeniorOfficer().subscribe((formData: any) => {
      this.TaskItems = [
        {
          type: formData.data.RC_DL_CHECK.type,
          imageSrc: '../../../../assets/task/RC_DL_CHECK.png', // Replace with actual asset path
          count: formData.data.RC_DL_CHECK.count
        },
        {
          type: formData.data.ACCIDENT_REPORT.type,
          imageSrc: '../../../../assets/task/ACCIDENT_REPORT.png',
          count: formData.data.ACCIDENT_REPORT.count
        },
        {
          type: formData.data.GENERAL_VIOLATER_REPORT.type,
          imageSrc: '../../../../assets/task/GENERAL_VIOLATER_REPORT.png',
          count: formData.data.GENERAL_VIOLATER_REPORT.count
        },
        {
          type: formData.data.CHALLAN.type,
          imageSrc: '../../../../assets/task/Challan Machile.png',
          count: formData.data.CHALLAN.count
        },
        {
          type: formData.data.GENERAL_INCIDENT_REPORT.type,
          imageSrc: '../../../../assets/task/ENCROACHMENT_REPORT.png',
          count: formData.data.GENERAL_INCIDENT_REPORT.count
        },
        {
          type: formData.data.ROAD_INCIDENT_REPORT.type,
          imageSrc: './../../../assets/task/ROAD_INCIDENT_REPORT.png',
          count: formData.data.ROAD_INCIDENT_REPORT.count
        },
        {
          type: formData.data.ENCROACHMENT_REPORT.type,
          imageSrc: '../../../../assets/task/ENCROACHMENT_REPORT.png',
          count: formData.data.ENCROACHMENT_REPORT.count
        },
        {
          type: formData.data.ABANDONED_VEHICLE.type,
          imageSrc: '../../../../assets/task/ABANDONED_VEHICLE.png',
          count: formData.data.ABANDONED_VEHICLE.count
        }
      ];
    });
  }
  
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
