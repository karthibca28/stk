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
  dynamaicDataForTable :any;
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.formService.getInventoryforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data)
      const cols = [
        { field: 'locationName', header: 'Location Name', type: 'text' },
        { field: 'itemName', header: 'Item Name', type: 'text' },
        { field: 'model', header: 'Model', type: 'text' },
        { field: 'description', header: 'Description', type: 'text' },
        { field: 'year', header: 'Year', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
  });
  }

  
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
