import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { APIResponse } from 'src/app/shared/models/api-response';
import { BeatService } from 'src/app/shared/services/beat.service';
import { FormService } from 'src/app/shared/services/form.service';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
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
  
  constructor(private beatService: BeatService, private router: Router, private formService: FormService, private secondaryService: SecondaryService) {}

  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.roleId === 4) {
      this.isSHO = true;
    } else if(this.userData.data.roleId === 1) {
      this.isAdmin = true;
    }
    
    this.getDashboard();
    this.getChart();
    this.getDlCheck()
  }
  getDashboard() {
    this.secondaryService.getDashboard().subscribe((resp: any) => {  
      this.dcount = resp.data;
      this.recentDuties =resp.data.recentDuties.list
      console.log(this.recentDuties)

    })
  }
  getDlCheck() {
    this.secondaryService.getDashboard().subscribe((resp: any) => {  
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
        { field: 'vechicleName', header: 'vechicleName', type: 'text' },
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
      table.clear();
      this.filter.nativeElement.value = '';
  }
 
}