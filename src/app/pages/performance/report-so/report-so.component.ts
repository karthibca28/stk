import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-report-so',
  templateUrl: './report-so.component.html',
  styleUrls: ['./report-so.component.scss']
})
export class ReportSoComponent implements OnInit {
  reportForm: FormGroup;
  zoneList:any
  rangeList:any
  districtList:any
  subDivisionList:any
  adminList:any
  stateList:any
  policeStationList:any
  data:any
  report:any
  downloadflag:boolean=false
  userData:any
  subTypeFilterList:any
  selectedvalue:any
  selectedtask:any
  roleId:any
  constructor(private fb: FormBuilder, private formService: FormService, public router: Router, private sharedService: SharedService, private secondaryService: SecondaryService,
    private masterService: MasterService) { }

  ngOnInit(): void {
    this.reportForm = this.fb.group({
      dateFilter: [''],
      type: [''],
      reportType: [''],
      reportSubType: [''],
      stateId: [''],
      adminId:[''],
      zoneId: [''],
      rangeId: [''],
      districtId: [''],
      subDivisionId: [''],
      policeStationId: [''],
    });
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.roleId = this.userData.data.userData.rank.role.roleCode
    console.log(this.roleId)
    this.getZoneList()
    this.getRangeList()
    this.getDistrictList()
    this.getSubDivision()
    this.getAdminList()
    this.getStateList()
    this.getPoliceStaion()
    this.getAccessControl()
  }
  onSelectionChangeLimit(event: any) {
    this.selectedvalue = event.value;
    // this.getSubTypeFilter();
  }
  onSelectionChangeTask(event:any){
    this.selectedtask = event.value;
    this.getSubTypeFilter()
  }
  getStateList() {
    this.masterService.commonStateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }

  getAdminList() {
    this.masterService.commonAdminList().subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }
  getZoneList() {
    this.masterService.commonZone().subscribe((resp: any) => {
       this.zoneList = resp.data
    });
  }
  getRangeList() {
    this.masterService.commonRange().subscribe((resp: any) => {
       this.rangeList = resp.data
    });
  }
   getDistrictList() {
    this.masterService.commonDistrict().subscribe((resp: any) => {
       this.districtList = resp.data
    });
  }
  getSubDivision() {
    this.masterService.commonSubDivision().subscribe((resp: any) => {
       this.subDivisionList = resp.data
    });
  }
  getPoliceStaion() {
    this.masterService.commonPoliceStation().subscribe((resp: any) => {
       this.policeStationList = resp.data
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data; 
    });
  }
  getSubTypeFilter() {
    this.masterService.subTypeFilter(this.selectedvalue,this.selectedtask).subscribe((resp: any) => {
      this.subTypeFilterList = resp.data; 
    });
  }

  onSubmit() {
    if(this.roleId === "4"){
    this.masterService.getReportsforSo(
      this.reportForm.value.dateFilter,
      this.reportForm.value.type,
      this.reportForm.value.reportType,
      this.reportForm.value.reportSubType,
      this.reportForm.value.stateId,
      this.reportForm.value.adminId,
      this.reportForm.value.zoneId,
      this.reportForm.value.rangeId,
      this.reportForm.value.districtId,
      this.reportForm.value.subDivisionId,
      this.reportForm.value.policeStationId
    ).subscribe((resp: any) => {
      setTimeout(() => {
        // this.ksLoader = false;
        this.report = resp.data;
        console.log("Response data", this.report);
        this.downloadFile(this.report);
      }, 2400);
    });
  }
  else if(this.roleId === "6"){
    this.masterService.getReportsfoAdmin(
      this.reportForm.value.dateFilter,
      this.reportForm.value.type,
      this.reportForm.value.reportType,
      this.reportForm.value.reportSubType,
      this.reportForm.value.stateId,
      this.reportForm.value.adminId,
      this.reportForm.value.zoneId,
      this.reportForm.value.rangeId,
      this.reportForm.value.districtId,
      this.reportForm.value.subDivisionId,
      this.reportForm.value.policeStationId
    ).subscribe((resp: any) => {
    this.report = resp.data
    });
  }
  }
  
  downloadFile(report){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', report);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  
}