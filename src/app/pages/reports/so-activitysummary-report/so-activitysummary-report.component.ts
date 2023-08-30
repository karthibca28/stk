import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BeatService } from 'src/app/shared/services/beat.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-so-activitysummary-report',
  templateUrl: './so-activitysummary-report.component.html',
  styleUrls: ['./so-activitysummary-report.component.scss']
})
export class SoActivitysummaryReportComponent implements OnInit {
  pipe = new DatePipe('en-US');
  public formData!: JsonFormData;
  title: string = '';
  pv: boolean;
  submitted: boolean;
  reportData: any;
  reportHeader: any;
  TypeData: any = "";
  viewTable: boolean = false;
  highlightData: any[];
  primColor: number = 2;
  ksLoader: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void { }

  reportForm = this.fb.group({fromDate: [''], toDate: ['']});
  get validFormControl() {
    return this.reportForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    const searchFromdate = this.pipe.transform(this.reportForm.value.fromDate, 'dd-MM-yyyy');
    const searchTodate = this.pipe.transform(this.reportForm.value.toDate, 'dd-MM-yyyy');
    if (this.reportForm.valid) {
      this.TypeData = {searchFromdate, searchTodate};
      this.formService.getActivitySummaryExport(this.TypeData).subscribe((resp: any) => {
        this.ksLoader = true;
        this.viewTable = false;
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            window.open(resp.fileUrl,'_blank');
            //console.log("Repor date", resp.fileUrl);
          }, 2400);
        } else {
          this.ksLoader = false;
          this.sharedService.showError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    } else {
      //console.log('Form not valid');
    }
  }
  // fileDownload(abc) {
  //   abc.fileUrl;
  //   console.log("Filedwonlo", abc.fileUrl)
  // };
  // csv_fileDownload() {
  //   var options = { 
  //     fieldSeparator: ',',
  //     quoteStrings: '"',
  //     decimalseparator: '.',
  //     showLabels: true, 
  //     showTitle: true,
  //     title: 'DateWise Report',
  //     useBom: true,
  //   };
  //   new ngxCsv(this.reportData, "Report", options);
  // }
  // cancel() {
  //   this.router.navigate(['/main/so']);
  // }
}
