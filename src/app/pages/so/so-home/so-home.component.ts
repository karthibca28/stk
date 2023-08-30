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
