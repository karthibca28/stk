
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DatePipe } from '@angular/common';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
@Component({
  selector: 'app-so-home',
  templateUrl: './so-home.component.html',
  styleUrls: ['./so-home.component.scss']
})
export class SoHomeComponent implements OnInit {
  pipe = new DatePipe('en-US');
  myDate = new Date();
  isSOff: boolean = false;
  broadCastModal: boolean;
  seniorData: any;
  userActive: number = 0;userInactive: number = 0;
  loginActive: number = 0;loginInactive: number = 0;
  stackedData: any;
  stackedOptions: any;
  //map data
  LiveBeat: any;
  mapData: any[]=[];
  msgList: any;
  totalUser: any;
  userStatus: any;
  actionKey: any;
  basicData:any;
  basicOptions:any
  dashboardData: any;
  userActivePercentage: number;
  userInActivePercentage: number;
  userNotLoginPercentage: number;
  junctionPoint:any
  vehicleCheck:any
  vipRoutes:any
  sectorDuty:any
  patrolDuty:any
  chartData: any;
  selected ='day'
  selectedvalue = '3'
  selectedtask = 'task'
  selectedDate:any
  data:any
  firstDate:any
  dates:any
  

  constructor(private router: Router, private formService: FormService, private secondaryService: SecondaryService, private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.getDashboard();
    this.getChartDataDlRC();
    this.getChartDataChallanCheck()
    }


onSelectionChange(event: any) {
  this.selected = event.value;
  this.getChartDataDlRC();
  this.getChartDataChallanCheck();
}
onSelectionChangeLimit(event: any) {
  this.selectedvalue = event.value;
  this.getChartDataDlRC();
}
onSelectionChangeTask(event:any){
  this.selectedtask = event.value;
  console.log(this.selectedtask)
  this.getChartDataChallanCheck()
}
onSelectionChangeDate(event:any){
  this.firstDate = event.value;
  console.log(this.selectedDate)
  this.getChartDataChallanCheck()
}
        
getDashboard() {
  this.secondaryService.getDashboardAdmin().subscribe((resp: any) => {
    this.dashboardData = resp.data;
    const userTotal = this.dashboardData.userSummary.userTotal;
    this.userActivePercentage = parseFloat(((this.dashboardData.userSummary.userActive / userTotal) * 100).toFixed(0));
    this.userInActivePercentage = parseFloat(((this.dashboardData.userSummary.userInActive / userTotal) * 100).toFixed(0));
    this.userNotLoginPercentage = parseFloat(((this.dashboardData.userSummary.userNotLogin / userTotal) * 100).toFixed(0));
    this.junctionPoint = this.dashboardData.dutySummary.junctionPoint;
    this.vehicleCheck = this.dashboardData.dutySummary.vehicleCheck;
    this.vipRoutes = this.dashboardData.dutySummary.vipRoutes;
    this.sectorDuty = this.dashboardData.dutySummary.sectorDuty;
    this.patrolDuty = this.dashboardData.dutySummary.patrolDuty;
  });
}



  listView(status: string, reType: any, calSearch: any) {
    const nAction = this.actionKey.nextAction;
    const inKey = this.actionKey.inputKey;
    const inId = 'all';
    this.router.navigate([`/main/lot/${nAction}/${status}/${reType}/${calSearch}/${inKey}/${inId}`]);
  }
  getChartDataDlRC() {
    this.secondaryService.getChartDataForAdminDLRC(this.selected, this.selectedvalue).subscribe((resp: any) => {
      if (resp.data && resp.data.summary && resp.data.summary.length > 0) {
        this.firstDate = resp.data.dates[0];
        this.dates = resp.data.dates
        console.log('First Date:', resp.data.dates);
  
        this.basicData = {
          labels: resp.data.dates,
          datasets: [
            {
              label: 'Task Total',
              backgroundColor: '#4E4FEB',
              data: resp.data.summary.map(item => item.taskTotal),
            },
            {
              label: 'Duty Total',
              backgroundColor: '#C70039',
              data: resp.data.summary.map(item => item.dutyTotal),
            }
          ]
        };
        console.log(this.basicData);
        this.getChartDataChallanCheck();
      }
    });
  }
   
  getChartDataChallanCheck() {
    this.secondaryService.getChartDataForAdmin(this.selected, this.firstDate, this.selectedtask).subscribe((resp: any) => {
    const datasetColors = [ '#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733', '#33FF57', '#5733FF', '#FF5733','#4E4FEB', '#C70039'];
  
      this.data = {
        labels: resp.data.map(item => item.dutyType || item.taskType),
        datasets: [
          {
            backgroundColor: datasetColors,
            data: resp.data.map(item => item.taskTotal),
            label: 'Task Total'
          },
          {
            backgroundColor: datasetColors,
            data: resp.data.map(item => item.dutyTotal),
            label: 'Duty Total'
          }
        ]
      }
    });
  }
  
  
}
