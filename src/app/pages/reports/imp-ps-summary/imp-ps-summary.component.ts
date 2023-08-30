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
  selector: 'app-imp-ps-summary',
  templateUrl: './imp-ps-summary.component.html',
  styleUrls: ['./imp-ps-summary.component.scss']
})
export class ImpPsSummaryComponent implements OnInit {
  pipe = new DatePipe('en-US');
  //table
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
  pstatList:any[]=[];
  distMapping:any[]=[];
  ksLoader: boolean = false;
  empty: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private formService: FormService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getStateCityDD();
    this.getDistDD();
    this.getReportPS();
  }
  getStateCityDD() {
    this.formService.getState().subscribe((resp: any) => {
      this.stateCity = resp.data;
    });
  }
  getDistDD() {
    this.formService.getReportDistrict().subscribe((resp: any) => {
      this.stateMapping = resp.data;
    });
  }
  updateFirstDropdown(event) { 
    const selectedRegions = event.value;
    this.distList = this.stateMapping.filter((state) => {
      return selectedRegions.some(stateId => stateId === state.stateId);
    }); 
  }
  getReportPS() {
    this.formService.getReportPStation2().subscribe((resp: any) => {
      this.distMapping = resp.data;
    });
  }
  updateSecondDropdown(event) { 
    const checkpStat = event.value;
    this.pstatList = this.distMapping.filter((dist) => {
      return checkpStat.some(districtId => districtId === dist.districtId);
    });
  } 
  myForm = this.fb.group({searchState: [''],searchDistrict: [''],searchPolicestation: [''],fromDate: [''],toDate: ['']});
  get validFormControl() {
    return this.myForm.controls;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    const searchState = form.value.searchState;
    const searchDistrict = form.value.searchDistrict;
    const searchPoliceStation = form.value.searchPolicestation;
    const fromDate = this.pipe.transform(form.value.fromDate, 'dd-MM-yyyy');
    const toDate = this.pipe.transform(form.value.toDate, 'dd-MM-yyyy');
    const data = { searchState, searchDistrict, searchPoliceStation, fromDate, toDate};
    this.formService.policeStationSummary(data).subscribe((resp: APIResponse) => {
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
