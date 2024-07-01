import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Paginator } from 'primeng/paginator';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DynamicTableComponent implements OnInit,OnChanges {
  cols: any[];
  tableData:any[]=[];
  paginator!: Paginator;
  loading: boolean;
  userData:any;
  DistAdmin:boolean = false;
  roleId:any
  searchKeyword:any
  pageSize: any
  pageNumber: any
  searchHeader: any[] = ['firstName','lastName','roleCode','inventoryType','rankName','fullName','gpfCpsNo','username','districtName','psName','district','policeStation','category','subcategory',
  'name','code','stateName','ZoneName','rangeName','subdivisionName','categoryName'];
  @Input() dynamaicDataForTable = {
    cols:[],
    values:[]
  }
  @Output() pagination = new EventEmitter();
  @Output() edit  = new EventEmitter();
  @Output() delete  = new EventEmitter();
  @Output() uptepwd = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    if(changes.dynamaicDataForTable.currentValue){
      this.cols = this.dynamaicDataForTable.cols.filter(f=>f.field!=='id' && f.field!=='sno-key');
      this.tableData = this.dynamaicDataForTable.values;
      this.loading = false;
    }
  }
  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
   console.log("datass")
   this.roleId = parseInt(this.userData.data.userData.rank.role.roleCode)
    if (this.roleId === 5) {
      this.DistAdmin = true
    }
  }

  editRecord(data:any){ 
    this.edit.emit(data.id)
  }
  deleteRecord(data:any){ 
    this.delete.emit(data.id)
  }
  // updatePwd(data:any){
  //   this.uptepwd.emit(data);
  // }
  
  clear(table: Table) {
      table.clear();
      this.searchKeyword = '';
  }

  onPageChange(event: any) {
    this.pageSize = event.rows;
    this.pageNumber = event.page + 1;
    console.log(event, this.pageSize, this.pageNumber)
    this.pagination.emit({ pageSize: this.pageSize, pageNumber: this.pageNumber });
  }

}
