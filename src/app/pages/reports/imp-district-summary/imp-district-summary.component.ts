import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormService } from 'src/app/shared/services/form.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Table } from 'primeng/table';
import { ngxCsv } from 'ngx-csv/ngx-csv';

@Component({
  selector: 'app-imp-district-summary',
  templateUrl: './imp-district-summary.component.html',
  styleUrls: ['./imp-district-summary.component.scss']
})
export class ImpDistrictSummaryComponent implements OnInit {
  pipe = new DatePipe('en-US');
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any;
  viewTable: boolean;
  submitted: boolean;
  stateCity:any[]=[];
  stateMapping:any[]=[];
  distList:any[]=[];
  ksLoader: boolean = false;
  empty: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private formService: FormService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getStateCityDD();
    this.getDistDD();
  }
  getStateCityDD() {
    this.formService.getState().subscribe((resp: any) => {
      this.stateCity = resp.data;
      //console.log("State DD", this.stateCity)
    });
  }
  getDistDD() {
    this.formService.getReportDistrict().subscribe((resp: any) => {
      this.stateMapping = resp.data;
      //console.log("Dist DD", this.stateMapping)
    });
  }
  updateSecondDropdown(event) { 
    const selectedRegions = event.value;
    //console.log("dataget", selectedRegions)
    this.distList = this.stateMapping.filter((state) => {
      return selectedRegions.some(stateId => stateId === state.stateId);
    }); 
 } 
  myForm = this.fb.group({ stateValue: [''], searchDistrict: [''], fromDate: [''],toDate: ['']});
  // get validFormControl() {
  //   return this.myForm.controls;
  // }
  onSubmit(form: FormGroup) {
    const searchState = form.value.stateValue;
    const searchDistrict = form.value.searchDistrict;
    const searchFromDate = this.pipe.transform(form.value.fromDate, 'dd-MM-yyyy');
    const searchToDate = this.pipe.transform(form.value.toDate, 'dd-MM-yyyy');
    const data = {searchState, searchDistrict, searchFromDate, searchToDate};
    //console.log(data);
    this.formService.districtSummary(data).subscribe((resp: APIResponse) => {
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
