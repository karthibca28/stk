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
  dynamaicDataForTable:any
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.formService.getTaskforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data);
      const cols = [
        { field: 'taskType', header: 'Task Type', type: 'text' },
        { field: 'challan', header: 'Challan', type: 'text' },
        { field: 'idType', header: 'ID Type', type: 'text' }, 
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'fatherName', header: 'Father Name', type: 'text' },
        { field: 'age', header: 'Age', type: 'text' },
        { field: 'gender', header: 'Gender', type: 'text' },
        { field: 'engineNo', header: 'EngineNo', type: 'text' },
        { field: 'locationName', header: 'Location Name', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
      ];

      values.forEach((value) => {
        value.idType = value.vehicleCheck?.idType; 
        value.name = value.vehicleCheck?.name; 
        value.fatherName = value.vehicleCheck?.fatherName; 
        value.age = value.vehicleCheck?.age; 
        value.gender = value.vehicleCheck?.gender; 
        value.engineNo = value.vehicleCheck?.engineNo; 
        value.locationName = value.vehicleCheck?.locationName; 
      });
  
      this.dynamaicDataForTable = { cols, values };
      console.log("master", this.dynamaicDataForTable);
    });
  }
  
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
