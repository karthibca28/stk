import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Table } from 'primeng/table';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BeatService } from 'src/app/shared/services/beat.service';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminHomeComponent implements OnInit {
  // pipe = new DatePipe('en-US');
  // myForm: FormGroup;
  // countries:any[]=[];
  // @ViewChild('dt') table: Table;
  // @ViewChild('filter') filter: ElementRef;
  // cols: any[];
  // tableData:any[]=[];
  // dynamaicDataForTable: any;
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  userData: any;
  psCount: number = 0;
  broadCastModal: boolean;
  // Chart
  beatOptions: any;
  stackedData: any;
  stackedOptions: any;
  sales: any[];
  // Current date
  myDate = new Date();
  // countriesMapping:any[]=[];
  // regions:any[]=[];
  Totdata: number = 60;
  // repDownload: Boolean = false;
  LiveBeat: any;
  mapData: any[]=[];
  countData: any;
  seniorData: any;
  linearData: any;
  // knob chart
  userActive: any;
  loginInactive: any;
  loginActive: any;
  notLogin: any;
  userchartdata: any;
  userchartOptions: any;
  // new 
  userStatus: any;
  chartData: any;
  actionKey: any;
  mobileApp: any;

  constructor(private fb: FormBuilder, private router: Router, private secondaryService: SecondaryService, private formService: FormService, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void { 
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.userData.roleId === 1) {
      this.isAdmin = true;
    } else if(this.userData.data.userData.roleId === 2) {
      this.isDAdmin = true;
    }
    // this.myForm = this.fb.group({ reportType: ['beat'], searchType: [''], searchDistrcit: ['', Validators.required], searchPolicestation: ['', Validators.required], fromDate: [''],toDate: [''] });
    this.getDashboard();
    // this.getChartData();
    // this.getPSCount();
  }
  onUpdate(type: string): void {
    this.router.navigate([`/main/user-config/user/${type}`]);
  }
  onTodayBeat(type: string): void {
    this.router.navigate([`/main/daily-activity/beat/beatList/${type}`]);
  }
  onTodayTask(type: any): void {
    this.router.navigate([`/main/daily-activity/field-task/taskList/${type}`]);
  }
  onTodayDuty(type: any): void {
    this.router.navigate([`/main/daily-activity/special-duty/dutyList/${type}`]);
  }
  getChartData() {
    this.formService.getChartData().subscribe((resp: any) => {
      this.stackedData = resp.data;
    });
  }
  //DAdmin
  getChartLinearData() {
    this.formService.getChartLinearData().subscribe((resp: any) => {
      this.linearData = resp.data;
    });
  }
  getMapData() {
    this.formService.getLiveBeatTrack().subscribe((resp: APIResponse) => {
      this.mapData = resp.data;
    })
  }
  // new api integratn with beat,task,duty summary
  getUserCount() {
    this.formService.getUserCount().subscribe((resp: APIResponse) => {
       this.countData = resp.data;
      //  console.log("Detail admin", this.countData);
    })
  }
  getSOfficerData() {
    this.formService.getSOfficerData().subscribe((resp: APIResponse) => {
      this.seniorData = resp.data;
    })
  }
  getPSCount() {
    this.formService.getPStationCount().subscribe((resp: APIResponse) => {
      this.psCount = resp.data;
    })
  }

  // new code
  getDashboard() {
    this.secondaryService.getDashboard().subscribe((resp: any) => {
      // this.actionKey = resp.nextAction;
      // this.countData = resp.data;
      // this.mobileApp = resp.data.mobileApp;
      // // User count
      // this.userActive = resp.data.totalUser;
      // this.loginInactive = resp.data.inactiveLogin;
      // this.loginActive = resp.data.activeLogin;
      // this.notLogin = resp.data.notLogin;
      // this.userChart();
      //  
      console.log("Main Data-", resp);
      // this.userStatus = resp.data.chartData;
      // this.chartData = {
      //   labels: this.userStatus.labels,
      //   datasets: [
      //       {
      //           label: 'Beat',
      //           summary: '00040',
      //           backgroundColor: '#265791',
      //           data: this.userStatus.beat
      //       },
      //       {
      //           label: 'Task',
      //           summary: '00040',
      //           backgroundColor: '#18B76B',
      //           data: this.userStatus.task
      //       },
      //       {
      //         label: 'Field Duty',
      //         summary: '00040',
      //         backgroundColor: '#F67070',
      //         data: this.userStatus.duty
      //     }
      //   ]
      // };
    })
  }
  listView(status: string, reType: any, calSearch: any) {
    // nextAction: {nextAction: 'listAll', inputKey: 'all', inputId: '', reportType: ''}
    const nAction = this.actionKey.nextAction;
    const inKey = this.actionKey.inputKey;
    const inId = 'all'; //this.actionKey.inputId;
    this.router.navigate([`/main/lot/${nAction}/${status}/${reType}/${calSearch}/${inKey}/${inId}`]);
  }
  // User chart
  userChart() {
    this.userchartdata = {
      labels: ['Inactive','Active login','Never login'],
      datasets: [
          {
              data: [this.loginInactive, this.loginActive, this.notLogin],
              backgroundColor: [
                  "#42A5F5",
                  "#66BB6A",
                  "#FFA726"
              ],
              hoverBackgroundColor: [
                  "#64B5F6",
                  "#81C784",
                  "#FFB74D"
              ]
          }
      ]
    };
    this.userchartOptions = {
      plugins: {
        legend: {
          position: 'right'
        }
      },
    };
  }


  getReport() {
    this.router.navigate(['/main/reports/admin-report']);
  }
  userList() {
    this.router.navigate(['/main/user-config/user-list']);
  }

}