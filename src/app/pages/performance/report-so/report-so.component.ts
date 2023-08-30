import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-report-so',
  templateUrl: './report-so.component.html',
  styleUrls: ['./report-so.component.scss']
})
export class ReportSoComponent implements OnInit {
  toppings = new FormControl('Duty');
  toppingList: string[] = ['Duty', 'Task'];
  // sec
  station = new FormControl('Ariyalur Station');
  stationList: string[] = ['Ariyalur Station', 'Tenkasi Station', 'Chennai Station', 'Erode Station', 'Salem Station'];
  // Third
  user = new FormControl('Ranjan');
  userList: string[] = ['Ranjan', 'Priyanga', 'Palanisamy'];
  
  
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  issofficer: boolean = false;
  isSHO: boolean = false;
  userData: any;
  pipe = new DatePipe('en-US');
  submitted: boolean;
  reportData: any[];
  reportHeader: any;
  viewTable: boolean = false;
  ksLoader: boolean = false;
  colsBeat: any[];
  IntialTable: boolean = false;
  //dd
  stateName: any[] = [];
  zoneName: any[] = [];
  rangeName: any[] = [];
  districtName: any[] = [];
  subdivisionName: any[] = [];
  psName: any[] = [];
  foName: any[] = [];
  dateWise: any[] = [];
  taskList: any;
  dutyList: any;
  Url: any;
  accFilter: any;
  acFilter: any;
  //filterData
  isState: boolean;
  isZone: boolean;
  isRange: boolean;
  isDistrict: boolean;
  isSubdivision: boolean;
  isPoliceStation: boolean;
  inputId: any;
  sdId: any;
  isDateEnable: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, public router: Router, private sharedService: SharedService, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.roleId === 1) {
      this.isAdmin = true;
    } else if(this.userData.data.roleId === 2) {
      this.isDAdmin = true;
    } else if(this.userData.data.roleId === 3) {
      this.issofficer = true;
    } else if(this.userData.data.roleId === 4) {
      this.isSHO = true;
    }
    this.getState();
    // Initial load data
    this.getInitialLoad();
    this.getAcFilter();
    // datewise init
    this.dateCalendar();
  }
  getInitialLoad() {
    var currentDate = new Date();
    var newTodate = this.pipe.transform(currentDate, 'dd-MM-yyyy');
    var date = new Date();
    date.setDate(date.getDate() - 30);
    var dateString = date.toISOString().split('T')[0];
    var newFromdate = this.pipe.transform(dateString, 'dd-MM-yyyy');
    const Data = {searchState: "0", searchZone:"", searchRange:"", searchDistrict:"", searchSubdivision:"", searchPoliceStation:"", searchUserFo:"", searchFromdate: newFromdate, searchTodate: newTodate};
    // console.log("Data", Data);
    this.formService.getPerformanceSummary(Data).subscribe((resp: APIResponse) => {
      if (resp.statusCode == 200) {
          this.reportData = resp.data.colsBeat;
          this.taskList = resp.data.colsTask;
          this.dutyList = resp.data.colsDuty;
          this.Url = resp.data.fileUrl;
          this.viewTable = false;
          this.IntialTable = true;
      } else {
        this.sharedService.showError(resp.message);
      }
    })
  }
  getAcFilter() {
    this.formService.getAccessFilter().subscribe((resp: any) => {
      this.acFilter = resp.data;
      this.inputId = resp.data.inputId;
      this.isState = resp.data.isState;
      this.isZone = resp.data.isZone;
      this.isRange = resp.data.isRange;
      this.isDistrict = resp.data.isDistrict;
      this.isSubdivision = resp.data.isSubdivision;
      this.isPoliceStation = resp.data.isPoliceStation;
      this.updateSubdivision(this.inputId);
    });
  }
  getState() {
    this.formService.getState().subscribe((resp: any) => {
      this.stateName = resp.data;
      this.stateName.unshift({id: '0', name: 'All'});
    });
  }
  updateZone(event) {
    const zdata = { "stateId": event.value, "type": 'single', "device": 'web'}
    this.formService.getZone(zdata).subscribe((resp: any) => {
      this.zoneName = resp.data;
    });
  }
  updateRange(event) {
    const rdata = { "zoneId" : event.value, "type" : 'single', "device": 'web' }
    this.formService.getRange(rdata).subscribe((resp: any) => {
      this.rangeName = resp.data;
    });
  }
  updateDistrict(event) {
    const ddata = { "rangeId" : event.value, "type" : 'single', "device": 'web' }
    this.formService.getDistrictDd(ddata).subscribe((resp: any) => {
      this.districtName = resp.data;
    });
  }
  updateSubdivision(event) {
    if(event.value === undefined) {
       this.sdId = event;
    }else{
      this.sdId = event.value;
    }
    const sddata = { "districtId" : this.sdId, "type" : 'single', "device": 'web' }
    this.formService.getSubdivision(sddata).subscribe((resp: any) => {
      this.subdivisionName = resp.data;
    });
  }
  updatePoliceStation(event) {
    const psdata = { "subdivisionId" : event.value, "type" : 'single', "device": 'web' }
    this.formService.getPoliceStationDd(psdata).subscribe((resp: any) => {
      this.psName = resp.data;
    });
  }
  updateUserFo(event) {
    const selectUser = event.value;
    const udata = { "searchPoliceStation" : selectUser, "device": 'web' };
    this.formService.getReportUserFo(udata).subscribe((resp: any) => {
      this.foName = resp.data;
    });
  }
  updateDatewise(event) {
    const selectDate = event.value;
    if (selectDate === 'custom') {
      this.isDateEnable = true;
    } else {
      this.isDateEnable = false;
    }
    console.log("Datewise", selectDate);
  }
  dateCalendar() {
    this.dateWise = [
      { id: 'today', name: 'Today' },
      { id: 'yesterday', name: 'Yesterday' },
      { id: 'thisWeek', name: 'This Week' },
      { id: 'lastWeek', name: 'Last Week' },
      { id: 'thisMonth', name: 'This Month' },
      { id: 'lastMonth', name: 'Last Month' },
      { id: 'custom', name: 'Custom' }
    ];
  }

  reportForm = this.fb.group({
    searchState: [''],
    searchZone: [''],
    searchRange: [''],
    searchDistrict: [''],
    searchSubdivision: [''],
    searchPoliceStation: [''],
    searchUserFo: [''],
    searchCalendar: [''],
    fromDate: [''],
    toDate: ['']
  });
  get validFormControl() {
    return this.reportForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.reportForm.valid) {
      this.ksLoader = true;
      this.viewTable = false;
      this.IntialTable = false;
      
      const searchState = this.reportForm.value.searchState;
      const searchZone = this.reportForm.value.searchZone;
      const searchRange = this.reportForm.value.searchRange;
      const searchDistrict = this.reportForm.value.searchDistrict;
      const searchSubdivision = this.reportForm.value.searchSubdivision;
      const searchPoliceStation = this.reportForm.value.searchPoliceStation;
      const searchUserFo = this.reportForm.value.searchUserFo;
      const searchCalendar = this.reportForm.value.searchCalendar;
      const searchFromdate = this.pipe.transform(this.reportForm.value.fromDate, 'dd-MM-yyyy');
      const searchTodate = this.pipe.transform(this.reportForm.value.toDate, 'dd-MM-yyyy');
      const summaryData = {searchState, searchZone, searchRange, searchDistrict, searchSubdivision, searchPoliceStation, searchUserFo, searchCalendar, searchFromdate, searchTodate};
      // getPerformanceSummary
      this.secondaryService.getPerformanceSummaryNew(summaryData).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.reportData = resp.data.colsBeat;
            this.taskList = resp.data.colsTask;
            this.dutyList = resp.data.colsDuty;
            this.Url = resp.data.fileUrl;
            this.viewTable = true;
          }, 2400);
        } else {
          this.ksLoader = false;
          this.sharedService.showError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    }
  }
  downloadFile(){
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.Url);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  cancel() {
    if (this.isAdmin || this.isDAdmin){
      this.router.navigate(['/main/admin']);
    } else if(this.issofficer){
      this.router.navigate(['/main/so']);
    } else if(this.isSHO){
      this.router.navigate(['/main']);
    }
  }

}