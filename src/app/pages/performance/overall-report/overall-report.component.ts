import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Table } from 'primeng/table';
import { DatePipe } from '@angular/common';
import { ngxCsv } from 'ngx-csv';
import { APIResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-overall-report',
  templateUrl: './overall-report.component.html',
  styleUrls: ['./overall-report.component.scss']
})
export class OverallReportComponent implements OnInit {
  pipe = new DatePipe('en-US');
  myForm: FormGroup;
  regions:any[]=[];
  countries:any[]=[];
  countriesMapping:any[]=[];
  repDownload: Boolean = false;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any;
  
  constructor(private fb: FormBuilder, private formService: FormService, private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({ reportType: ['beat'], searchType: [''], searchDistrcit: ['', Validators.required], searchPolicestation: ['', Validators.required], fromDate: [''],toDate: [''] });
    this.getDistDropdown();
    this.getReportPS();
  }

  getDistDropdown() {
    this.formService.getReportDistrict().subscribe((resp: any) => {
      this.regions = resp.data;
    });
  }
  updateSecondDropdown(event) { 
    const selectedRegions = event.value;
    this.countries = this.countriesMapping.filter((dist) => {
      return selectedRegions.some(districtId => districtId === dist.districtId);
    }); 
  } 
  getReportPS() {
    this.formService.getReportPStation2().subscribe((resp: any) => {
      this.countriesMapping = resp.data;
    });
  }

  onSubmit() {
    const searchDistrict = this.myForm.value.searchDistrcit;
    const searchPoliceStation = this.myForm.value.searchPolicestation;
    const fromDate = this.pipe.transform(this.myForm.value.fromDate, 'dd-MM-yyyy');
    const toDate = this.pipe.transform(this.myForm.value.toDate, 'dd-MM-yyyy');
    const data = {searchDistrict, searchPoliceStation, fromDate, toDate};
    this.repDownload = false;
    if (this.myForm.valid) {
      this.formService.getAdminDBReport(data).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
          this.repDownload = true;
          this.dynamaicDataForTable = resp.data.values;
          setTimeout(() => {
            this.sharedService.showDownload(resp.message);
          }, 800);
        } else {
          this.sharedService.showDownloadError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    } else {
      this.sharedService.showError('Please select mandatory fields!');
    }
  }
  csv_fileDownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Summary Details',
      useBom: true,
      headers: ["District", "Police Station", "Active Beat", "Pending Beat", "Completed Beat", "Approved Beat", "Pending Task", "Completed Task", "Pending Duty", "Completed Duty", "Approved Duty"]
    };
    new ngxCsv(this.dynamaicDataForTable, "Report", options);
  }

}
