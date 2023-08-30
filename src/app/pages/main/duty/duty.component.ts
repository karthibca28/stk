import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable = {
    cols: [
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'module', header: 'Duty Type', type: 'text' },
        { field: 'accessRight', header: 'Status', type: 'text' },
    ],
    values: [{ name: 'Muthukumar', module: 'S.Duty', accessRight: 'Completed' },
    { name: 'Rajwaran', module: 'S.Duty', accessRight: 'Pending' }],
  };
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    // const fKey = {
    //     formKey : "master-rank"
    // }
    // this.formService.getDynamicListData(fKey).subscribe((formData: any) => {
    //     this.dynamaicDataForTable = formData.data;
    // });
  }
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
