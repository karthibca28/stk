import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
    this.getZoneList()
    this.getRangeList()
    this.getDistrictList()
    this.getSubDivision()
    this.getAdminList()
    this.getStateList()
    this.getPoliceStaion()
    this.getAccessControl()
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

  onSubmit() {
    this.masterService.getReports(
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
      const blob = new Blob([resp.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'report.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  
  
  
}