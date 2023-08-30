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
  data: any;
  dcount: any;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];

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
  }
  getDashboard() {
    this.secondaryService.getDashboard().subscribe((resp: any) => {  
      this.dcount = resp.data;
      console.log("Main Data-", this.dcount);
    })
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

 
  dynamaicDataForTable = {
    cols: [
        { field: 'sno', header: 'City/District', type: 'text' },
        { field: 'vType', header: 'Police Station', type: 'text' },
        { field: 'model', header: 'Total Assets', type: 'text' },
        { field: 'makeYear', header: 'Date', type: 'text' },
        { field: 'dateAdded', header: 'Date', type: 'text' },
    ],
    values: [
      { sno: '1', vType: 'Adayar Station', model: '3044', makeYear: '2015', dateAdded: '14-08-2023' },
      { sno: '2', vType: 'Salem Station', model: '12303', makeYear: '2017', dateAdded: '14-08-2023' },
      { sno: '3', vType: 'Karur Station', model: '30303', makeYear: '2017', dateAdded: '14-08-2023' },
      { sno: '4', vType: 'Erode Station', model: '39494', makeYear: '2019', dateAdded: '14-08-2023' },
      { sno: '5', vType: 'Erode Station', model: '39494', makeYear: '2020', dateAdded: '14-08-2023' },
      { sno: '6', vType: 'Erode Station', model: '39494', makeYear: '2021', dateAdded: '14-08-2023' }
    ],
  };
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
 
}