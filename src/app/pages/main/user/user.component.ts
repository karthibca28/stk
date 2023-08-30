import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable = {
    cols: [
        { field: 'name', header: 'Name', type: 'text' },
        { field: 'module', header: 'Role', type: 'text' },
        { field: 'date', header: 'Station', type: 'text' },
        { field: 'accessRight', header: 'Status', type: 'text' },
    ],
    values: [{ name: 'Ramarajan', module: 'SP', date: 'Adayar Station', accessRight: 'Active' },
    { name: 'Praveen', module: 'SI', date: 'Erode Station', accessRight: 'Active' },
    { name: 'Murali', module: 'SI', date: 'Chennai Station', accessRight: 'Active' },
    { name: 'Nageswarn', module: 'ASP', date: 'Chennai Station', accessRight: 'De-Active' }],
  };
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
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
