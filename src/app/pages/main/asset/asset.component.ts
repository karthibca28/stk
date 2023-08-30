import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable = {
    cols: [
        { field: 'name', header: 'City/District', type: 'text' },
        { field: 'module', header: 'Police Station', type: 'text' },
        { field: 'count', header: 'Total Assets', type: 'text' },
        { field: 'accessRight', header: 'Date', type: 'text' },
    ],
    values: [{ name: 'Chennai City', module: 'Adayar Station', count: '3044', accessRight: '14-08-2023' },
    { name: 'Salem', module: 'Salem Station', count: '12303', accessRight: '10-08-2023' },
    { name: 'Karur', module: 'Karur Station', count: '30303', accessRight: '12-08-2023' },
    { name: 'Erode', module: 'Erode Station', count: '39494', accessRight: '14-08-2023' }],
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
