import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-dynamic-view-table',
  templateUrl: './dynamic-view-table.component.html',
  styleUrls: ['./dynamic-view-table.component.scss']
})
export class DynamicViewTableComponent implements OnInit {
  cols: any[];
  tableData:any[]=[];
  loading: boolean;
  userData:any;
  DistAdmin:boolean = false;
  roleId:any
  searchKeyword:any
  searchHeader: any[] = ['firstName','locationName','title','message','fullName','gpfCpsNo','username','districtName','psName','district','policeStation','category','subcategory',
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
  constructor() { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
   console.log("datass")
   this.roleId = parseInt(this.userData.data.userData.rank.role.roleCode)
    if (this.roleId === 5) {
      this.DistAdmin = true
    }
  }
  viewRecord(data:any){ 
    this.view.emit(data.id)
  }
  clear(table: Table) {
      table.clear();
      this.searchKeyword = '';
  }


}
