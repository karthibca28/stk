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
  chartData: any;
  actionKey: any;
  basicData:any;
  basicOptions:any
  value: number = 50;
  value1: number = 40;
  value2: number = 80;
  value3: number = 30;
  value4: number = 90;

  constructor(private router: Router, private formService: FormService, private secondaryService: SecondaryService, private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.getDashboard();
    // this.getSOfficerData();
    // this.getMapData();
    // this.getChartData();
    // this.getMessageQ();
    this.stackedOptions = {
      plugins: {
        legend: {
          position: 'right'
        }
      },
    };
    this.basicData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
          {
              label: 'My First dataset',
              backgroundColor: '#42A5F5',
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: 'My Second dataset',
              backgroundColor: '#FFA726',
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };

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


this.stackedData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [{
      type: 'bar',
      label: 'Dataset 1',
      backgroundColor: '#42A5F5',
      data: [
          50,
          25,
          12,
          48,
          90,
          76,
          42
      ]
  }, {
      type: 'bar',
      label: 'Dataset 2',
      backgroundColor: '#66BB6A',
      data: [
          21,
          84,
          24,
          75,
          37,
          65,
          34
      ]
  }, {
      type: 'bar',
      label: 'Dataset 3',
      backgroundColor: '#FFA726',
      data: [
          41,
          52,
          24,
          74,
          23,
          21,
          32
      ]
  }]
};

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
        

  // getMapData() {
  //   this.formService.getLiveBeatTracking().subscribe((resp: APIResponse) => {
  //       this.mapData = resp.data;
  //   })
  // }
  // getMessageQ() {
  //   this.formService.getBroadcastList().subscribe((resp: any) => {
  //     this.msgList = resp.data;
  //   });
  // }
  // getSOfficerData() {
  //   this.formService.getSOfficerData().subscribe((resp: APIResponse) => {
  //     this.seniorData = resp.data;
  //     console.log("senior DAta-", this.seniorData);
  //   })
  // }
  getDashboard() {
    this.secondaryService.getDashboard().subscribe((resp: any) => {
      this.actionKey = resp.nextAction;
      this.seniorData = resp.data;
      // console.log("SO Data-", this.actionKey);
      this.userStatus = resp.data.chartData;
      this.chartData = {
        labels: this.userStatus.labels,
        datasets: [
            {
                label: 'Beat',
                summary: '00040',
                backgroundColor: '#265791',
                data: this.userStatus.beat
            },
            {
                label: 'Task',
                summary: '00040',
                backgroundColor: '#18B76B',
                data: this.userStatus.task
            },
            {
              label: 'Field Duty',
              summary: '00040',
              backgroundColor: '#F67070',
              data: this.userStatus.duty
          }
        ]
      };
    })
  }
  listView(status: string, reType: any, calSearch: any) {
    // nextAction: {nextAction: 'listAll', inputKey: 'all', inputId: '', reportType: ''}
    const nAction = this.actionKey.nextAction;
    const inKey = this.actionKey.inputKey;
    const inId = 'all'; //this.actionKey.inputId;
    this.router.navigate([`/main/lot/${nAction}/${status}/${reType}/${calSearch}/${inKey}/${inId}`]);
  }
  // getChartData() {
  //   this.formService.getChartData().subscribe((resp: any) => {
  //     this.stackedData = resp.data;
  //   });
  // }

}
