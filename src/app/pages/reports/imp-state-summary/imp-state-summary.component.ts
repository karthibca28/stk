import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormService } from 'src/app/shared/services/form.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Table } from 'primeng/table';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Component({
  selector: 'app-imp-state-summary',
  templateUrl: './imp-state-summary.component.html',
  styleUrls: ['./imp-state-summary.component.scss']
})
export class ImpStateSummaryComponent implements OnInit {
  pipe = new DatePipe('en-US');
  pstatList:any[]=[];
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any;
  viewTable: boolean;
  submitted: boolean;
  distMapping:any[]=[];
  stateCity:any[]=[];
  ksLoader: boolean = false;
  empty: boolean = false;
  totData: any;

  constructor(private router: Router, private fb: FormBuilder, private formService: FormService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getStateCityDD();
    const data = { stateValue: [''], fromDate: "", toDate: "" };
    this.onSubmit(data)
  }
  getStateCityDD() {
    this.formService.getState().subscribe((resp: any) => {
      this.stateCity = resp.data;
    });
  }

  myForm = this.fb.group({ stateValue: [''],fromDate: [''],toDate: ['']});

  onSubmit(inData?: any) {
    const searchState = this.myForm.value.stateValue;
    const searchFromDate = this.pipe.transform(this.myForm.value.fromDate, 'dd-MM-yyyy');
    const searchToDate = this.pipe.transform(this.myForm.value.toDate, 'dd-MM-yyyy');
    if(searchState === '') {
      this.totData = inData;
    }else{
      this.totData = {searchState, searchFromDate, searchToDate};
    }
    this.formService.stateSummary(this.totData).subscribe((resp: APIResponse) => {
      this.ksLoader = true;
      this.empty = false;
      this.viewTable = false;
      if (resp.statusCode == 200) {
        setTimeout(() => {
          this.ksLoader = false;
          this.dynamaicDataForTable = resp.data;
          this.viewTable = true;
        }, 2400);
      } else {
        this.ksLoader = false;
        this.empty = true;
      }
    }, (err: Error) => {
      this.sharedService.showError('Problem occurred, Please try again');
    })
  }
  csv_fileDownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      // title: 'Reports',
      useBom: true,
      headers: this.dynamaicDataForTable.reportHeader
    };
    new ngxCsv(this.dynamaicDataForTable.values, "SummaryReport", options);
  }

  cancel() {
    this.router.navigate(['/main/admin']);
  }

}
