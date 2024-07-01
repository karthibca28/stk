import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'exceljs';
import { BeatService } from 'src/app/shared/services/beat.service';
import { FormService } from 'src/app/shared/services/form.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-sho-home',
  templateUrl: './sho-home.component.html',
  styleUrls: ['./sho-home.component.scss']
})
export class ShoHomeComponent implements OnInit {
  one: any;
  two: any;
  three: any;
  isSHO: boolean = false;
  isAdmin: boolean = false;
  userData: any;
  // Chart
  loading: boolean;
  data: any;
  dcount: any = {};
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  recentDuties:any;
  mapData: any[]=[];
  tableData:any[]=[];
  latitude: number;
  longitude: number;
  sosalert: any[] = []
  
  constructor(private beatService: BeatService, private router: Router, private loadingService: LoadingService, private formService: FormService, private secondaryService: SecondaryService) {}

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.roleId === 4) {
      this.isSHO = true;
    } else if(this.userData.data.roleId === 1) {
      this.isAdmin = true;
    }
    
    this.getDashboard();
    this.getChart();
    this.getDlCheck();
    this.cols = [
      { field: 'licenseNumber', header: 'License Number' },
      { field: 'driverName', header: 'Driver Name' },
      { field: 'violation', header: 'Violation' },
      { field: 'fineAmount', header: 'Fine Amount' },
      { field: 'issueDate', header: 'Issue Date' },
      { field: 'status', header: 'Status' }
    ];

    this.tableData = [
      {
        licenseNumber: 'DL12345',
        driverName: 'Ragu',
        violation: 'Speeding',
        fineAmount: '₹100',
        issueDate: '2024-01-01',
        status: 'Paid'
      },
      {
        licenseNumber: 'DL67890',
        driverName: 'Aravinth',
        violation: 'Running a red light',
        fineAmount: '₹200',
        issueDate: '2024-01-05',
        status: 'Unpaid'
      },
      {
        licenseNumber: 'DL54321',
        driverName: 'Kumar',
        violation: 'No helmet',
        fineAmount: '₹50',
        issueDate: '2024-01-10',
        status: 'Paid'
      },
      {
        licenseNumber: 'DL54321',
        driverName: 'Kumar',
        violation: 'No helmet',
        fineAmount: '₹50',
        issueDate: '2024-01-10',
        status: 'Paid'
      }
    ];
    this.loading = false;
    this.sosalert = [
      {
        createdBy: {
          fullName: 'Inspector Rajesh'
        },
        locationName: 'Anna Salai, Chennai'
      },
      {
        createdBy: {
          fullName: 'Officer Suresh'
        },
        locationName: 'MG Road, Coimbatore'
      },
      {
        createdBy: {
          fullName: 'Inspector Kavitha'
        },
        locationName: 'East Coast Road, Chennai'
      },
      {
        createdBy: {
          fullName: 'Officer Anbu'
        },
        locationName: 'Marina Beach, Chennai'
      },
      {
        createdBy: {
          fullName: 'Inspector Ravi'
        },
        locationName: 'Kamarajar Salai, Madurai'
      }
    ];
  }
  getDashboard() {
    // this.loadingService.showLoader();
    this.secondaryService.getShoDashboard().subscribe((resp: any) => {  
      this.dcount = resp.data;
      this.mapData = resp.data.liveUsers
      this.recentDuties =resp.data.recentDuties.list
      console.log(this.mapData)
    })
    this.loadingService.hideLoader();
  }
  getDlCheck() {
    this.secondaryService.getShoDashboard().subscribe((resp: any) => {  
      const values = resp.data.dlRcCheck.map(item => {
        return {
          // id: item.id,
          policeStation: item.policeStation.name,
          vechicleName: item.vehicleCheck.name,
          RcNo: item.vehicleCheck.rcNo,
        };
      });
  
      const cols = [
        // { field: 'id', header: 'id', type: 'text' },
        { field: 'policeStation', header: 'PoliceStation', type: 'text' },
        { field: 'vechicleName', header: 'Person Name', type: 'text' },
        { field: 'RcNo', header: 'Rc No', type: 'text' },
      ];
  
      this.tableData = values;
      this.cols = cols; 
    });
  }
  
  getChart() {
    this.data = {
      labels: ['Duty','Task'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: [
              "#18B76B",
              "#F1B814"
          ],
          hoverBackgroundColor: [
              "#BEF5D5",
              "#FAF0D2"
          ]
        }
      ]
    };
  }

  listView(status: string) {
    console.log("getID", status);
    this.router.navigate([`/main/lot/${status}`]);
  }

 

  
  clear(table: Table) {
      // table.clear();
      this.filter.nativeElement.value = '';
  }

  actionKey: any;

  listViews(status: string, reType: any, calSearch: any) {
    // nextAction: {nextAction: 'listAll', inputKey: 'all', inputId: '', reportType: ''}
    const nAction = this.actionKey.nextAction;
    const inKey = this.actionKey.inputKey;
    const inId = 'all'; //this.actionKey.inputId;
    this.router.navigate([`/main/lot/${nAction}/${status}/${reType}/${calSearch}/${inKey}/${inId}`]);
  }

}
