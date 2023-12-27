import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

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
    private masterService: MasterService,private loadingService: LoadingService,) { }

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
    // this.getZoneList()
    // this.getRangeList()
    // this.getDistrictList()
    // this.getSubDivision()
    // this.getAdminList()
    // this.getStateList()
    // this.getPoliceStaion()
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

  getAdminList(id:any) {
    this.masterService.commonAdminList(id).subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }


  getZoneList(id:any) {
    this.masterService.commonZone(id).subscribe((resp: any) => {
       this.zoneList = resp.data
    });
  }

  getRangeList(id:any) {
    this.masterService.commonRange(id).subscribe((resp: any) => {
       this.rangeList = resp.data
    });
  }
   getDistrictList(id:any) {
    this.masterService.commonDistrict(id).subscribe((resp: any) => {
       this.districtList = resp.data
    });
  }
  getSubDivision(id:any) {
    this.masterService.commonSubDivision(id).subscribe((resp: any) => {
       this.subDivisionList = resp.data
    });
  }
  getPoliceStaion(id:any) {
    this.masterService.commonPoliceStation(id).subscribe((resp: any) => {
       this.policeStationList = resp.data
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data;
      console.log(this.data)
      if(this.data.zoneId === true){
      this.getZoneList(resp.data.inputId)
      }
      if(this.data.rangeId === true){
      this.getRangeList(resp.data.inputId)
    }
      if(this.data.districtId === true){
      this.getDistrictList(resp.data.inputId)
      }
      if(this.data.subDivisionId === true){
      this.getSubDivision(resp.data.inputId)
      }
      if(this.data.adminId === true){
      this.getAdminList(resp.data.inputId)
      }
      // if(this.data.stateId === true){
      // this.getStateList()
      // }
      if(this.data.policeStationId === true){
      this.getPoliceStaion(resp.data.inputId)
      }
    });
  }
  getSubTypeFilter() {
    this.masterService.subTypeFilter(this.selectedvalue,this.selectedtask).subscribe((resp: any) => {
      this.subTypeFilterList = resp.data; 
    });
  }

  async onSubmit() {
    this.loadingService.showLoader();
    if(this.roleId === "4"){
    await this.masterService.getReportsforSo(
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
    ).then(res=>{console.log('>>> res', res); this.downloadFile(res)}).catch(e=>console.log('>> error ion onsubmit ', e))
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
    ).then(res=>{console.log('>>> res', res); this.downloadFile(res)}).catch(e=>console.log('>> error ion onsubmit ', e))
  }
  this.loadingService.hideLoader();
  }
  
  downloadFile(report){
    console.log('>>>>',report);
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(report);
    link.download = 'report.xlsx';
    document.body.appendChild(link);
    console.log('link',link)
    link.click();
    document.body.removeChild(link);
  }
  
}