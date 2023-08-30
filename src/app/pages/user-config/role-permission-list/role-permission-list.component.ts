import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role-permission-list',
  templateUrl: './role-permission-list.component.html',
  styleUrls: ['./role-permission-list.component.scss']
})
export class RolePermissionListComponent implements OnInit {
  title: string = 'Role Permission';
  dataList: any[];
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  dynamaicDataForTable = {
      cols: [
          { field: 'rolename', header: 'Role', type: 'text' },
          { field: 'module', header: 'Modules', type: 'text' },
          { field: 'accessRight', header: 'Access Rights', type: 'text' },
      ],
      values: [{ rolename: 'Super Admin', module: 'Beat', accessRight: 'Edit, Delete' },
      { rolename: 'Super Admin', module: 'Beat', accessRight: 'Add, Edit, Delete' }],
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  openForm() {
      this.router.navigate(['main/user-config/role-permission-form']);
  }

}
