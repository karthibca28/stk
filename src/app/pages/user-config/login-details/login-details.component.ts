import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { APIResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-login-details',
  templateUrl: './login-details.component.html',
  styleUrls: ['./login-details.component.scss']
})
export class LoginDetailsComponent implements OnInit {

  public formData!: JsonFormData;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any;
  toDownload:boolean;

  constructor(private formService: FormService, private router: Router, private actRoute: ActivatedRoute, private sharedService: SharedService, private confirmationService: ConfirmationService) { }
  
  ngOnInit(): void {
    const type = this.actRoute.snapshot.params['status'];
    //console.log("Type of id -", type);
    this.getList(type);
  }
  getList(type: any) {
    //Adminside list
    const sData = {"searchType": type};
    this.formService.getUserloginListWeb(sData).subscribe((resp: APIResponse) => {
      this.dynamaicDataForTable = resp.data;
      this.toDownload = true;
    })
  }
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
}
