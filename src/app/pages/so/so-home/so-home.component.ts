
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DatePipe } from '@angular/common';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
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
  userData:any
  inventoryItems:any
  imgData:any
  alert:any
  sosalert:any

  constructor(private router: Router,private loadingService: LoadingService, private formService: FormService,private masterService:MasterService, private secondaryService: SecondaryService, private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.getDashboard();
    this.getChartDataDlRC();
    this.getChartDataChallanCheck();
    this.getInventoryType();
    this.getAlert();
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
  this.loadingService.showLoader();
  this.secondaryService.getDashboardAdmin().subscribe((resp: any) => {
    this.dashboardData = resp.data;
    const userTotal = this.dashboardData.userSummary.userTotal;
    this.userActivePercentage = parseFloat(((this.dashboardData.userSummary.userActive / userTotal) * 100).toFixed(0));
    this.userInActivePercentage = parseFloat(((this.dashboardData.userSummary.userInActive / userTotal) * 100).toFixed(0));
    this.userNotLoginPercentage = parseFloat(((this.dashboardData.userSummary.userNotLogin / userTotal) * 100).toFixed(0));
    this.userData = {
      labels: ['Active Users Percentage', 'Inactive Users Percentage', 'Not Logged In Users Percentage'],
      datasets: [
        {
          data: [this.userActivePercentage, this.userInActivePercentage, this.userNotLoginPercentage],
          backgroundColor: ['#2ecc71', '#FA383E', '#438AEA'],
        },
      ],
    };
    console.log(this.userData)
    this.junctionPoint = this.dashboardData.dutySummary.junctionPoint;
    this.vehicleCheck = this.dashboardData.dutySummary.vehicleCheck;
    this.vipRoutes = this.dashboardData.dutySummary.vipRoutes;
    this.sectorDuty = this.dashboardData.dutySummary.sectorDuty;
    this.patrolDuty = this.dashboardData.dutySummary.patrolDuty;
  this.loadingService.hideLoader();
  });
}

getInventoryType() {
  this.masterService.inventoryTypeList().subscribe((res: any) => {
    console.log(res.data)
    this.inventoryItems = res.data.map(item => {
      // if (item.image) {
      //   this.masterService.inventoryImg(item.image.downloadPath).subscribe((imgRes: any) => {
      //     item.imageURL = imgRes;
      //     console.log(item.imageURL);
      //   });
      // }
      return item;
    });
  });
}

async getImage(url: string): Promise<string> {
  try {
    // const res = await this.masterService.inventoryImg(url);
    console.log('getImage > ', url ,'-','res')
    // if (!res) {
    //   throw new Error('Invalid file response');
    // }

    // this.fileType = res.type
    // console.log(res.type)
    // const fileUrl = await this.getPdfUrl(res);
    // this.fileUrl = fileUrl;
    return ''
  } catch (e) {
    console.error('Error fetching or processing file:', e);
    return ''
  }
}

// _getImage(e:Blob): SafeResourceUrl {
//   const pdfUrl = URL.createObjectURL(e);
//   console.log("Select files", pdfUrl)
//   this.isFileLoaded = true;
//   return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
//   if (this.fileUrl) {
//   // const pdfBlob = new Blob(e, { type: 'application/pdf' });
// } else {
//   // If fileUrl is not available, return an empty SafeResourceUrl
//   return '';
// }


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
              backgroundColor: '#FA383E',
              data: resp.data.summary.map(item => item.taskTotal),
            },
            {
              label: 'Duty Total',
              backgroundColor: '#438AEA',
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
    const datasetColors = [ '#FA3D17', '#2ecc71', '#3498db', '#e74c3c', '#8e44ad', '#f39c12', '#1abc9c', '#d35400', '#2c3e50', '#2980b9', '#27ae60', '#f39c12', '#16a085','#7f8c8d', '#7f8c8d'];
      this.data = {
        labels: resp.data.map(item => item.dutyType || item.taskType),
        datasets: [
          {
            backgroundColor: datasetColors,
            data: resp.data.map(item => item.taskTotal),
            label: 'Task Total',
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
  
  getAlert() {
    this.formService.getSOSAlert().subscribe((formData: any) => {
      this.alert = formData.data.AmbulanceAlert?.slice(0, 5);
      this.sosalert = formData.data.SosAlert?.slice(0, 5);
    });
  }
  
  
}
