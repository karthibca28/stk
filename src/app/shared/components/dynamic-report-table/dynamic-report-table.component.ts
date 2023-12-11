import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-dynamic-report-table',
  templateUrl: './dynamic-report-table.component.html',
  styleUrls: ['./dynamic-report-table.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class DynamicReportTableComponent implements OnInit {
  cols: any[];
  tableData:any[]=[];
  searchKeyword:any
  searchHeader: any[] = ['firstName','lastName','gpfCpsNo','username','districtName','psName','district','policeStation','category','subcategory',
  'name','code','stateName','ZoneName','rangeName','subdivisionName','categoryName','locCategoryName','locSubcategoryName'];
  loading: boolean;
  pageNumber:number
  @Input() dynamaicDataForTable = {
    cols:[],
    values:[]
  }
  @Output() edit  = new EventEmitter();
  @Output() delete  = new EventEmitter();
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

  onPageChange(event: any) {
    // The 'event' object will contain the new page number in the 'first' property
    this.pageNumber = event.first / event.rows + 1;
  console.log(this.pageNumber);
    // Now, you can make your API request using this.pageNumber

  }

  editRecord(data:any){ 
    this.edit.emit(data.id)
  }
  deleteRecord(data:any){ 
    this.delete.emit(data.id)
  }
  
  clear(table: Table) {
      table.clear();
      this.searchKeyword = '';
  }

}
