import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';
import { JsonFormData } from 'src/app/shared/models/json-form-data';

@Component({
  selector: 'app-rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.scss']
})
export class RankListComponent implements OnInit {
  title: string = 'Rank List';
  public formData!: JsonFormData;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any; 
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    const fKey = {
        formKey : "master-rank"
    }
    this.formService.getDynamicListData(fKey).subscribe((formData: any) => {
        this.dynamaicDataForTable = formData.data;
    });
  }
  editRecord(rankId:number){
      this.router.navigateByUrl(`main/user-config/rank-form/${rankId}`);
  }
  deleteRecord(rankId:number){
      const dataKey = { formKey: 'master-rank', deleteId: rankId };
      this.confirmationService.confirm({
          message: 'Are you sure you want to delete the record?',
          accept: () => {
              this.formService.deleteMasterList(dataKey).subscribe((resp: APIResponse) => {
                  //console.log("datakey",dataKey);
                  if (resp.statusCode == '200') {
                    this.getList();
                    this.sharedService.showSuccess('Record delete successfully');
                  }
              })
          },
          reject: () => {
              this.sharedService.showWarn('Cencelled');
          }
      });
  }
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  openForm() {
      this.router.navigate(['main/user-config/rank-form']);
  }

}
