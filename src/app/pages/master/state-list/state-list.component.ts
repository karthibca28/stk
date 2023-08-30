import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { APIResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-state-list',
  templateUrl: './state-list.component.html',
  styleUrls: ['./state-list.component.scss']
})
export class StateListComponent implements OnInit {
  public formData!: JsonFormData;
  title: string = 'State List';
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  // dynamaicDataForTable: any;
  dynamaicDataForTable = {
    cols: [
        { field: 'name', header: 'State Name', type: 'text' },
        { field: 'createdDate', header: 'Created Date', type: 'text' },
        { field: 'status', header: 'Status', type: 'text' },
    ],
    values: [{ name: 'Tamilnadu', createdDate: '22-10-2023', status: 'Active' }],
  };
  deleteModal: boolean = false;
  stat: number;
  toDownload:boolean;

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getList();
  }
  getList() {
    // const fKey = { formKey : "master-state" };
    // this.formService.getDynamicListData(fKey).subscribe((formData: any) => {
    //     this.dynamaicDataForTable = formData.data;
    //     this.toDownload = true;
    // });
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
      this.router.navigate(['main/master/state-form']);
  }

}
