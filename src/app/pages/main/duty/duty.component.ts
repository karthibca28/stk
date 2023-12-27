import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData: any[] = [];
  dynamaicDataForTable: any
  DutyItems: any[] = [];
  selected = ''
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

  constructor(private formBuilder: FormBuilder,private masterService: MasterService, private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

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
    this.getDutySummary()
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

  getList() {
    this.formService.getDutyforSeniorOfficer(
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
      console.log(formData.data)
      const cols = [
        { field: 'dutyType', header: 'Duty Type', type: 'text' },
        { field: 'status', header: 'Status', type: 'text' },
        { field: 'districtName', header: 'District Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
        { field: 'startLocationName', header: 'Start Location Name', type: 'text' },
        { field: 'endLocationName', header: 'End Location Name', type: 'text' },
      ];
      this.dynamaicDataForTable = { cols, values };
      console.log("master", this.dynamaicDataForTable)
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
  getDutySummary() {
    this.formService.getDutySummaryforSeniorOfficer().subscribe((formData: any) => {
      this.DutyItems = [
        {
          type: this.replaceUnderscores(formData.data.JUNCTION_POINT.type),
          imageSrc: 'assets/task/ENCROACHMENT_REPORT.png',
          count: formData.data.JUNCTION_POINT.count
        },
        {
          type: this.replaceUnderscores(formData.data.PATROL_DUTY.type),
          imageSrc: 'assets/Duty/icons8-traffic-48.png',
          count: formData.data.PATROL_DUTY.count
        },
        {
          type: this.replaceUnderscores(formData.data.SECTOR_DUTY.type),
          imageSrc: 'assets/Duty/icons8-traffic-jam-48.png',
          count: formData.data.SECTOR_DUTY.count
        },
        {
          type: this.replaceUnderscores(formData.data.VEHICLE_CHECK.type),
          imageSrc: 'assets/Duty/icons8-vip-48.png',
          count: formData.data.VEHICLE_CHECK.count
        }
      ];
    });
  }

  replaceUnderscores(type: string): string {
    return type.replace(/_/, ' '); // Replace underscores with spaces in the type
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

  viewRecord(dutyId:any){
    this.router.navigate([`main/lot/view-duty`,dutyId])
  }
}
