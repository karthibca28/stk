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
  dynamaicDataForTable :any
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
  }
  getList() {
    this.formService.getUserforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      const cols = [
        { field: 'fullName', header: 'Name', type: 'text' },
        { field: 'rank', header: 'Rank', type: 'text' },
        { field: 'gpfCpsNo', header: 'Gpf Cps No', type: 'text' },
        { field: 'email', header: 'Email', type: 'text' },
        { field: 'phone', header: 'Phone Number', type: 'text' },
        { field: 'address', header: 'Address', type: 'text' },
        { field: 'subDivisionName', header: 'District', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
      ];
      values.forEach((value) => {
        value.rank = value.rank?.rankName; 
      });
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
  });
  }
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
