
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
  

  constructor(private router: Router, private formService: FormService, private secondaryService: SecondaryService, private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.getDashboard();
    // this.getSOfficerData();
    // this.getMapData();
    // this.getChartData();
    // this.getMessageQ();
    this.getChartDataDlRC();
    this.getChartDataChallanCheck()
   
//     this.basicData = {
//       labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//       datasets: [
//           {
//               label: 'Driving Licence',
//               backgroundColor: '#42A5F5',
//               data: [65, 59, 80, 81, 56, 55, 40]
//           },
//           {
//               label: 'Registration Certificates',
//               backgroundColor: '#FFA726',
//               data: [28, 48, 40, 19, 86, 27, 90]
//           }
//       ]
//   };

  this.basicOptions = {
      plugins: {
          legend: {
              labels: {
                  color: '#495057'
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          },
          y: {
              ticks: {
                  color: '#495057'
              },
              grid: {
                  color: '#ebedef'
              }
          }
      }
  };


// this.stackedData = {
//   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//   datasets: [{
//       type: 'bar',
//       label: 'Constable',
//       backgroundColor: '#4155C6',
//       data: [
//           50,
//           25,
//           12,
//           48,
//           90,
//           76,
//           42
//       ]
//   }, {
//       type: 'bar',
//       label: 'Inspector',
//       backgroundColor: '#FF7E79',
//       data: [
//           21,
//           84,
//           24,
//           75,
//           37,
//           65,
//           34
//       ]
//   }, {
//       type: 'bar',
//       label: 'Senior Officer',
//       backgroundColor: '#FFE500',
//       data: [
//           41,
//           52,
//           24,
//           74,
//           23,
//           21,
//           32
//       ]
//   }]
// };

this.stackedOptions = {
  plugins: {
      tooltips: {
          mode: 'index',
          intersect: false
      },
      legend: {
          labels: {
              color: '#495057'
          }
      }
  },
  scales: {
      x: {
          stacked: true,
          ticks: {
              color: '#495057'
          },
          grid: {
              color: '#ebedef'
          }
      },
      y: {
          stacked: true,
          ticks: {
              color: '#495057'
          },
          grid: {
              color: '#ebedef'
          }
      }
  }
};
}
        
  getDashboard() {
    this.secondaryService.getDashboardAdmin().subscribe((resp: any) => {
      this.dashboardData = resp.data;

      const userTotal = this.dashboardData.userSummary.userTotal;
      this.userActivePercentage = (this.dashboardData.userSummary.userActive / userTotal) * 100;
      this.userInActivePercentage = (this.dashboardData.userSummary.userInActive / userTotal) * 100;
      this.userNotLoginPercentage = (this.dashboardData.userSummary.userNotLogin / userTotal) * 100;
      this.junctionPoint  =this.dashboardData.dutySummary.junctionPoint
      this.vehicleCheck =this.dashboardData.dutySummary.vehicleCheck
      this.vipRoutes =this.dashboardData.dutySummary.vipRoutes
      this.sectorDuty =this.dashboardData.dutySummary.sectorDuty
      this.patrolDuty =this.dashboardData.dutySummary.patrolDuty


    });
  }

  listView(status: string, reType: any, calSearch: any) {
    const nAction = this.actionKey.nextAction;
    const inKey = this.actionKey.inputKey;
    const inId = 'all';
    this.router.navigate([`/main/lot/${nAction}/${status}/${reType}/${calSearch}/${inKey}/${inId}`]);
  }
  getChartDataDlRC() {
    this.secondaryService.getChartDataForAdminDLRC().subscribe((resp: any) => {
        if (resp.data) {
          this.basicData = {
            labels: resp.data.map(item => item.Date),
            datasets: [
              {
                label: 'Total',
                backgroundColor: '#4E4FEB',
                data: resp.data.map(item => item.Total),
              }
            ]
          };
          console.log(this.basicData);
        }
      });
  }  
  getChartDataChallanCheck(){
    this.secondaryService.getChartDataForAdmin().subscribe((resp: any) => {
        if (resp.data) {
          this.stackedData = {
            labels: resp.data.map(item => item.Date),
            datasets: [
              {
                label: 'Total',
                backgroundColor: '#FFD93D',
                data: resp.data.map(item => item.Total),
              }
            ]
          };
          console.log(this.basicData);
        }
      });
  }

}