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
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
  pipe = new DatePipe('en-US');
  pstatList:any[]=[];
  //table
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any;
  viewTable: boolean;
  submitted: boolean;
  distMapping:any[]=[];
  policeStat:any[]=[];
  ksLoader: boolean = false;
  empty: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private formService: FormService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getDistDropdown();
    this.getReportPS();
  }
  getDistDropdown() {
    this.formService.getReportDistrict().subscribe((resp: any) => {
      this.policeStat = resp.data;
    });
  }
  getReportPS() {
    this.formService.getReportPStation2().subscribe((resp: any) => {
      this.distMapping = resp.data;
    });
    // const data = {};
    // this.formService.getReportPStation(data).subscribe((resp: any) => {
    //   this.policeStat = resp.data;
    //   console.log("drpdwn", this.policeStat)
    // });
    // const data = { searchDistrict : [22] }
    // this.formService.getReportPStation(data).subscribe((formData: any) => {
    //     this.distMapping = formData.data;
    //     console.log(this.distMapping)
    // });
  }
  updateSecondDropdown(event) { 
    const selectedRegions = event.value;
    this.pstatList = this.distMapping.filter((dist) => {
      return selectedRegions.some(districtId => districtId === dist.districtId);
    }); 
 } 
  myForm = this.fb.group({ reportType: ['beat'],searchDistrcit: ['', Validators.required],searchPolicestation: ['', Validators.required],fromDate: [''],toDate: ['']});
  get validFormControl() {
    return this.myForm.controls;
  }
  onSubmit(form: FormGroup) {
    this.submitted = true;
    const reportType = form.value.reportType;
    const searchDistrict = form.value.searchDistrcit;
    const searchPoliceStation = form.value.searchPolicestation;
    const fromDate = this.pipe.transform(form.value.fromDate, 'dd-MM-yyyy');
    const toDate = this.pipe.transform(form.value.toDate, 'dd-MM-yyyy');
    const data = {reportType, searchDistrict, searchPoliceStation, fromDate, toDate};
    //console.log('form data', data);
    if (form.valid) {
      this.formService.getReportAdmin(data).subscribe((resp: APIResponse) => {
        this.ksLoader = true;
        this.empty = false;
        this.viewTable = false;
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.dynamaicDataForTable = resp.data;
            this.viewTable = true;
            // this.sharedService.showDownload(resp.message);
          }, 2400);
        } else {
          this.ksLoader = false;
          this.empty = true;
          //this.sharedService.showError(resp.message);
        }
        // if (resp.statusCode == 200) {
        //   this.viewTable = true;
        //   this.dynamaicDataForTable = resp.data;
        //   const col = resp.data.cols;
        //   console.log("all report data", this.dynamaicDataForTable);
        //   setTimeout(() => {
        //     this.sharedService.showDownload(resp.message);
        //   }, 800);
        // } else {
        //   this.sharedService.showDownloadError(resp.message);
        // }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    } else {
      //console.log('Form not valid');
    }
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
    new ngxCsv(this.dynamaicDataForTable.values, "Report", options);
  }

  cancel() {
    this.router.navigate(['/main/admin']);
  }
}
