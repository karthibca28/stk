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
  selector: 'app-district-list',
  templateUrl: './district-list.component.html',
  styleUrls: ['./district-list.component.scss']
})
export class DistrictListComponent implements OnInit {
  public formData!: JsonFormData;
  title:string='District List';
  cols: any[];
  tableData:any[]=[];
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  dynamaicDataForTable: any;
  // dynamaicDataForTable = {
  //   cols: [
  //       { field: 'name', header: 'District Name', type: 'text' },
  //       { field: 'createdDate', header: 'Created Date', type: 'text' },
  //       { field: 'status', header: 'Status', type: 'text' },
  //   ],
  //   values: [{ name: 'Chennai', createdDate: '22-10-2023', status: 'Active' },
  //   { name: 'Salem', createdDate: '22-10-2023', status: 'Active' },
  //   { name: 'Erode', createdDate: '22-10-2023', status: 'Active' }],
  // };
  toDownload:boolean;

  constructor(private masterService: MasterService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) {}

  ngOnInit() {
    this.getList();
  }
  getList() {
    this.masterService.district().subscribe((formData: any) => {
      const values = formData.data;
      const cols = [
        { field: 'code', header: 'Code', type: 'text' },
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'administration', header: 'Administration', type: 'text' },
        { field: 'zone', header: 'Zone', type: 'text' },
        { field: 'range', header: 'Range', type: 'text' },
        { field: 'description', header: 'Description', type: 'text' },
        { field: 'isActive', header: 'Status', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
    });
  }
  editRecord(distId:number){
    this.router.navigateByUrl(`main/master/district-form/${distId}`);
  }
  deleteRecord(distId:number){
    // const dataKey = { formKey: 'master-district', deleteId: distId };
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the record?',
    //     accept: () => {
    //         this.formService.deleteMasterList(dataKey).subscribe((resp: APIResponse) => {
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
  openForm(){
    this.router.navigate(['main/master/district-form'])
  }

}
