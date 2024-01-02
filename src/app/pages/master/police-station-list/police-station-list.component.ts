import {Component, OnInit, ViewChild, ElementRef} from '@angular/core' ;
import {Table} from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { ConfirmationService } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-police-station-list',
  templateUrl: './police-station-list.component.html',
  styleUrls: ['./police-station-list.component.scss']
})
export class PoliceStationListComponent implements OnInit {
  public formData!: JsonFormData;
  cols: any[];
  tableData:any[]=[];
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  dynamaicDataForTable: any;
  // dynamaicDataForTable = {
  //   cols: [
  //       { field: 'name', header: 'Station Name', type: 'text' },
  //       { field: 'createdDate', header: 'Created Date', type: 'text' },
  //       { field: 'status', header: 'Status', type: 'text' },
  //   ],
  //   values: [{ name: 'Adayar Station', createdDate: '22-10-2023', status: 'Active' },
  //   { name: 'Salem Station', createdDate: '22-10-2023', status: 'Active' },
  //   { name: 'Madurai Station', createdDate: '22-10-2023', status: 'Active' }],
  // };
  toDownload:boolean;
  userData: any;
  isDistrictAdmin: boolean;

  constructor(private masterService: MasterService, private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) {}
  
  ngOnInit() {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log("LoginData", this.userData);
    this.isDistrictAdmin = this.userData.data.userData.rank.role.roleCode === "5";
    this.getList();
  }
  getList() {
    this.masterService.policeStation().subscribe((formData: any) => {
      const values = formData.data;
      const cols = [
        { field: 'code', header: 'Code', type: 'text' },
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'administrationName', header: 'Administration', type: 'text' },
        { field: 'zoneName', header: 'Zone', type: 'text' },
        { field: 'rangeName', header: 'Range', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division', type: 'text' },
        { field: 'description', header: 'Description', type: 'text' },
        //{ field: 'isActive', header: 'Status', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
    });
  }
  editRecord(policeStationId:number){
    this.router.navigateByUrl(`main/master/police-station-form/${policeStationId}`);
  }
  deleteRecord(policeStationId:number){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the record?',
      accept: () => {
          this.masterService.deletePoliceStationList(policeStationId).subscribe((resp: any) => {             
                this.getList();
                this.sharedService.showSuccess('Record deleted successfully');
          })
      },
      reject: () => {
          this.sharedService.showWarn('Cancelled');
      }
  });
  }
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  openForm(){
    this.router.navigate(['main/master/police-station-form'])
  }

}