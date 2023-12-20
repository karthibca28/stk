import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  TaskItems:any[]=[];
  pageNumber:number
  dynamaicDataForTable:any
  currentPageNumber: number | undefined = 1;
  selected = 'all';
  data: any
  zoneList: any
  rangeList: any
  districtList: any
  subDivisionList: any
  adminList: any
  stateList: any
  policeStationList: any
  admin:any
  zone:any
  range:any
  district:any
  subDivision:any
  policeStation:any
  selectedsubDivision:any
  selectedpoliceStation:any
selectedadmin:any
selectedzone:any
selectedrange:any
selecteddistrict:any
  selectedDate = 'today'

  constructor(private formBuilder: FormBuilder,private masterService: MasterService,private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      adminId: [''],
      zoneId: [''],
      rangeId:[''],
      districtId: [''],
      subDivisionId: [''],
      policeStationId: [''],
    });
    this.getList();
    this.getTaskSummary();
    this.getAccessControl()
  }

  onSelectionChange(event: any) {
    this.selected = event.value;
    this.getList();  
  }
  onSelectionChangedate(event: any){
    this.selectedDate = event.value;
    this.getList();
  }
  onSelectionsubDivision(event: any){
    this.selectedsubDivision = event.value;
    this.getList();
  }
  onSelectionpoliceStation(event: any){
    this.selectedpoliceStation = event.value;
    this.getList();
  }
  onSelectionadmin(event: any) {
    this.selectedadmin = event.value;
    this.getList(); 
  }
  onSelectionzone(event: any){
    this.selectedzone = event.value;
    this.getList();
  }
  onSelectionrange(event: any){
    this.selectedrange = event.value;
    this.getList();
  }
  onSelectiondistrict(event: any){
    this.selecteddistrict = event.value;
    this.getList();
  }
  onPageChange(event: any) {
    this.pageNumber = event.first / event.rows + 1;
  }
  getList() {
    this.formService.getTaskforSeniorOfficer(
      this.selected,
      this.selectedDate,
      this.selectedadmin,
      this.selectedzone,
      this.selectedrange,
      this.selecteddistrict,
      this.selectedsubDivision,
      this.selectedpoliceStation
      ).subscribe((formData: any) => {
      const values = formData.data;
      const cols = [
        { field: 'taskType', header: 'Task Type', type: 'text' },
        { field: 'challan', header: 'Challan', type: 'text' },
        { field: 'vehicleNumber', header: 'Vehicle Number', type: 'text' }, 
        { field: 'vehicleType', header: 'Vehicle Type', type: 'text' },
        { field: 'createdAt', header: 'Date and Time', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
      ];

      values.forEach((value) => {
        value.vehicleNumber = value.generalIncident?.vehicleNumber; 
        value.vehicleType = value.abandonedVehicle?.vehicleType; 
      });
  
      this.dynamaicDataForTable = { cols, values };
      console.log("masters",this.dynamaicDataForTable)
    });
  }
  getAdminList(id: any) {
    this.masterService.commonAdminList(id).subscribe((resp: any) => {
      this.adminList = resp.data
    });
  }


  getZoneList(id: any) {
    this.masterService.commonZone(id).subscribe((resp: any) => {
      this.zoneList = resp.data
    });
  }

  getRangeList(id: any) {
    this.masterService.commonRange(id).subscribe((resp: any) => {
      this.rangeList = resp.data
    });
  }
  getDistrictList(id: any) {
    this.masterService.commonDistrict(id).subscribe((resp: any) => {
      this.districtList = resp.data
    });
  }
  getSubDivision(id: any) {
    this.masterService.commonSubDivision(id).subscribe((resp: any) => {
      this.subDivisionList = resp.data
    });
  }
  getPoliceStaion(id: any) {
    this.masterService.commonPoliceStation(id).subscribe((resp: any) => {
      this.policeStationList = resp.data
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data;
      console.log(this.data)
      if (this.data.zoneId === true) {
        this.getZoneList(resp.data.inputId)
      }
      if (this.data.rangeId === true) {
        this.getRangeList(resp.data.inputId)
      }
      if (this.data.districtId === true) {
        this.getDistrictList(resp.data.inputId)
      }
      if (this.data.subDivisionId === true) {
        this.getSubDivision(resp.data.inputId)
      }
      if (this.data.adminId === true) {
        this.getAdminList(resp.data.inputId)
      }
      // if(this.data.stateId === true){
      // this.getStateList()
      // }
      if (this.data.policeStationId === true) {
        this.getPoliceStaion(resp.data.inputId)
      }
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
    return type?.replace(/_/g, ' '); 
  }
  
  viewRecord(taskId:any){
    this.router.navigate([`main/lot/view-task`,taskId])
  }
  
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
