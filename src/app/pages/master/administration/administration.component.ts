import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent implements OnInit {
  public formData!: JsonFormData;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  // dynamaicDataForTable: any;
  dynamaicDataForTable: any;
  //   cols: [
  //     { field: 'id', header: 'ID', type: 'text' },
  //     { field: 'code', header: 'Code', type: 'text' },
  //     { field: 'name', header: 'Name', type: 'text' },
  //     { field: 'description', header: 'Description', type: 'text' },
  //     { field: 'isActive', header: 'Status', type: 'text' },
  //   ],
  //   values: [
  //     { name: 'Zone', createdDate: '22-10-2023', status: 'Active' },
  //     { name: 'City', createdDate: '22-10-2023', status: 'Active' }
  //   ],
  // };
  deleteModal: boolean = false;
  stat: number;
  toDownload:boolean;

  constructor(private router: Router, private sharedService: SharedService, private masterService:MasterService) {}

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.masterService.adList().subscribe((formData: any) => {
        const values = formData.data;
        const cols = [
          { field: 'code', header: 'Code', type: 'text' },
          { field: 'name', header: 'Name', type: 'text' },
          { field: 'description', header: 'Description', type: 'text' },
          { field: 'isActive', header: 'Status', type: 'text' },
        ];
        this.dynamaicDataForTable = {cols, values};
        console.log("master",this.dynamaicDataForTable)
    });
  }
  editRecord(stateId:number){
    // this.router.navigateByUrl(`main/master/state-form/${stateId}`);
  }
  deleteRecord(stateId:number){
    // const dataKey = { formKey: 'master-state', deleteId: stateId };
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the record?',
    //     accept: () => {
    //         this.formService.deleteMasterList(dataKey).subscribe((resp: APIResponse) => {
    //             //console.log("datakey",dataKey);
    //             if (resp.statusCode == '200') {
    //               this.getList();
    //               this.sharedService.showSuccess('Record deleted successfully');
    //             }
    //         })
    //     },
    //     reject: () => {
    //         this.sharedService.showWarn('Cencelled');
    //     }
    // });
  }
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  openForm() {
      this.router.navigate(['main/master/administration-form']);
  }

}
