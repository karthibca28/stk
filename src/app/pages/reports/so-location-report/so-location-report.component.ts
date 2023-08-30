import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BeatService } from 'src/app/shared/services/beat.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-so-location-report',
  templateUrl: './so-location-report.component.html',
  styleUrls: ['./so-location-report.component.scss']
})
export class SoLocationReportComponent implements OnInit {
  TypeData: any;
  printData: any;
  viewTable: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void {
    this.getChartData();
  }
  getChartData() {
    this.formService.getLocationExport().subscribe((resp: any) => {
      this.TypeData = resp.data;
      this.printData = resp.fileUrl;
      //console.log("admin chart data-", this.printData);
    });
  }
}