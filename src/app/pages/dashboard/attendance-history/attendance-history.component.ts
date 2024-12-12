import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss']
})
export class AttendanceHistoryComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable :any;
  attHistory: any;
  userID: any;
  roleId:any
  isAdmin:boolean = false;
  isDAdmin:boolean = false;
  
  constructor(private masterService: MasterService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.roleId = parseInt(userData.data.userData.rank.role.roleCode)
    if (this.roleId === 6) {
      this.isAdmin = true;
    } else if(this.roleId === 2) {
      this.isDAdmin = true;
    }
    this.masterService.attendanceHistory().subscribe((resp: any) => {
      this.attHistory = resp;
      const values = resp.data;
      const cols = [
        { field: 'userId', header: 'User Name', type: 'text' },
        { field: 'year', header: 'Year', type: 'text' },
        { field: 'month', header: 'Month', type: 'text' },
        { field: 'status', header: 'Status', type: 'text' },
        { field: 'remark', header: 'Remarks', type: 'text' },
        { field: 'lat', header: 'Latitude', type: 'text' },
        { field: 'lng', header: 'Longitude', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("Data", this.dynamaicDataForTable)
    });
    
  }
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }


  // ngOnInit(): void {
  //   this.userID = JSON.parse(sessionStorage.getItem('userInfo') as string);
  //   console.log("User data", this.userID);
  //   this.masterService.attendanceHistory().subscribe((resp: any) => {
  //     this.attHistory = resp;
  //     const values = resp.data;
  //     const cols = [
  //       { field: 'itemName', header: 'Item Name', type: 'text' },
  //       { field: 'model', header: 'Model', type: 'text' },
  //       { field: 'description', header: 'Description', type: 'text' },
  //       { field: 'year', header: 'Year', type: 'text' },
  //       { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
  //       { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
  //     ];
  //     this.dynamaicDataForTable = {cols, values};
  //     console.log("Data", resp)
  //   });
    // const userId = 'clofbsfgu00059a09qjimow6h';
    // this.masterService.getAttendanceById(userId).subscribe((resp: any) => {
    //   this.attHistory = resp;
    //   console.log("Data", resp)
    // });
  // }

  // createAttendance() {
  //   const data = {
  //     "remark":"testing",
  //     "latitude":"10.09",
  //     "longitude":"58.09",
  //     "userId": this.userID.id
  //   };
  //   this.masterService.attendanceInout(data).subscribe((resp: any) => {
  //     this.attHistory = resp;
  //     console.log("Data", resp)
  //   });
  // }

}
