import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FormService } from 'src/app/shared/services/form.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Table } from 'primeng/table';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BeatService } from 'src/app/shared/services/beat.service';

@Component({
  selector: 'app-so-detail-report',
  templateUrl: './so-detail-report.component.html',
  styleUrls: ['./so-detail-report.component.scss']
})
export class SoDetailReportComponent implements OnInit {
  pipe = new DatePipe('en-US');
  myForm: FormGroup;
  countries:any[]=[];
  //table
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  //reportDB: any;
  viewTable: boolean;
  countriesMapping:any[]=[];
  regions:any[]=[];
  radUpdate1: boolean = true;
  radUpdate2: boolean = false;
  radUpdate3: boolean = false;
  typeBeat: any[]=[];
  typeTask: any[]=[];
  typeSd: any[]=[];
  ReHeader: any[]=[];
  ksLoader: boolean = false;
  empty: boolean = false;

  constructor(private router: Router, private fb: FormBuilder, private formService: FormService, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({ reportType: ['beat'], searchType: [''], searchDistrcit: [''], searchPolicestation: [''], fromDate: [''],toDate: [''] });
    this.getDistrict();
    this.getPoliceStation();
    this.ddgetBeat();
    this.ddgetTask();
    this.ddgetSd();
  }
  radOnchange(evt) {
    var target = evt.target.value;
    //console.log(target);
      if (target == "beat") {
        this.radUpdate1 = true;
        this.radUpdate2 = false;
        this.radUpdate3 = false;
      } else if(target == "task") {
        this.radUpdate1 = false;
        this.radUpdate2 = true;
        this.radUpdate3 = false;
      } else if(target == "specialduty") {
        this.radUpdate1 = false;
        this.radUpdate2 = false;
        this.radUpdate3 = true;
      }
  }
  getDistrict() {
    this.formService.getDistrict().subscribe((resp: any) => {
      this.regions = resp.data;
    });
  }
  getPoliceStation() {
    this.formService.getPoliceStation().subscribe((resp: any) => {
      this.countriesMapping = resp.data;
    });
  }
  ddgetBeat() {
    this.beatService.getBeatType().subscribe((resp: any) => {
      this.typeBeat = resp.data;
    });
  }
  ddgetTask() {
    this.beatService.getFieldTaskType().subscribe((resp: any) => {
      this.typeTask = resp.data;
    });
  }
  ddgetSd() {
    this.beatService.getSpecialDutyType().subscribe((resp: any) => {
      this.typeSd = resp.data;
    });
  }
  updateSecondDropdown(event) { 
    const selectedRegions = event.value;
    this.countries = this.countriesMapping.filter((dist) => {
      return selectedRegions.some(districtId => districtId === dist.districtId);
    }); 
 } 
  onSubmit(form: FormGroup) {
    const reportType = form.value.reportType;
    const searchType = form.value.searchType;
    const searchDistrict = form.value.searchDistrcit;
    const searchPoliceStation = form.value.searchPolicestation;
    const fromDate = this.pipe.transform(form.value.fromDate, 'dd-MM-yyyy');
    const toDate = this.pipe.transform(form.value.toDate, 'dd-MM-yyyy');
    const data = {reportType, searchType, searchDistrict, searchPoliceStation, fromDate, toDate};
    //console.log('form data', data);
    if (form.valid) {
      this.formService.getDetailReportWeb(data).subscribe((resp: APIResponse) => {
        this.empty = false;
        this.ksLoader = true;
        this.viewTable = false;
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.tableData = resp.data.values;
            this.cols = resp.data.cols;
            this.ReHeader = resp.data.reportHeader;
            this.csv_fileDownload();
            //this.viewTable = true;
            // console.log("data-",this.ReHeader )
            this.sharedService.showDownload(resp.message);
          }, 2400);
        } else {
          this.ksLoader = false;
          this.empty = true;
          // this.sharedService.showError(resp.message);
        }
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
      headers: this.ReHeader
    };
    new ngxCsv(this.tableData, "Admin Report", options);
  }

  cancel() {
    this.router.navigate(['/main/admin']);
  }

}
