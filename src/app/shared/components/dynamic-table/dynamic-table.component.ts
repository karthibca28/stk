import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
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
  loading: boolean;
  searchHeader: any[] = ['firstName','gpfCpsNo','username','districtName','psName','district','policeStation','category','subcategory',
  'name','code','stateName','ZoneName','rangeName','subdivisionName','categoryName'];
  @Input() dynamaicDataForTable = {
    cols:[],
    values:[]
  }
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
  }

}
