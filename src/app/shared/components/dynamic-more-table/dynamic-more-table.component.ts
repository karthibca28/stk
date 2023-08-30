import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-dynamic-more-table',
  templateUrl: './dynamic-more-table.component.html',
  styleUrls: ['./dynamic-more-table.component.scss'],
  encapsulation:ViewEncapsulation.None,
})
export class DynamicMoreTableComponent implements OnInit {
cols: any[];
  tableData:any[]=[];
  loading: boolean;
  searchHeader: any[] = ['firstName','gpfCpsNo','username','districtName','psName','district','policeStation','category','subcategory',
  'name','code','stateName','ZoneName','rangeName','subdivisionName','categoryName'];
  @Input() dynamaicDataForTable = {
    cols:[],
    values:[]
  }
  @Output() view  = new EventEmitter();
  ngOnChanges(changes: SimpleChanges): void {
    this.loading = true;
    if(changes.dynamaicDataForTable.currentValue){
      this.cols = this.dynamaicDataForTable.cols.filter(f=>f.field!=='id' && f.field!=='sno-key');
      this.tableData = this.dynamaicDataForTable.values;
      this.loading = false;
    }
  }
  
  ngOnInit(): void {
   
  }

  viewRecord(data:any){ 
    this.view.emit(data)
  }
  
  clear(table: Table) {
      table.clear();
  }

}
