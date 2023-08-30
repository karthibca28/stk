import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable = {
    cols: [
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'module', header: 'Task Name', type: 'text' },
        { field: 'date', header: 'Date', type: 'text' },
        { field: 'accessRight', header: 'Status', type: 'text' },
    ],
    values: [{ name: 'Ranjith P', module: 'General', date: '02-08-2023', accessRight: 'Completed' },
    { name: 'Praveen', module: 'Patrol', date: '03-08-2023', accessRight: 'Pending' },
    { name: 'Nageswarn', module: 'General', date: '10-08-2023', accessRight: 'Completed' }],
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
