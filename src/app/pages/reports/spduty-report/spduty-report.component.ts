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
  selector: 'app-spduty-report',
  templateUrl: './spduty-report.component.html',
  styleUrls: ['./spduty-report.component.scss']
})
export class SpdutyReportComponent implements OnInit {

  pipe = new DatePipe('en-US');
  public formData!: JsonFormData;
  title: string = '';
  pv: boolean;
  submitted: boolean;
  reportData: any;
  reportHeader: any;
  bType: any = "";
  foUser: any[] = [];
  typeBeat: any[] = [];
  spType: any[] = [];
  radUpdate: boolean = false;
  viewTable: boolean = false;
  calc: number = 0;
  highlightData: any[];
  primColor: string = "on";
  ksLoader: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void {
    // Init dropdown data
    this.ddFoUser();
    this.ddgetspDuty();
    
    this.highlightData = [{name: 'Beat',value: '1'}, {name: 'Task', value: '2'}, {name: 'Field Duty', value: 'on'}];
  }
  eventTrg(event) {
    //console.log(event.value);
    let ngValue = event.value;
    if(ngValue === '1') {
      this.router.navigate(['/main/reports/mis-reports']);
    }else if(ngValue === '2') {
      this.router.navigate(['/main/reports/task-report']);
    }
  }
  ddFoUser() {
    this.beatService.getFoUser().subscribe((resp: any) => {
      this.foUser = resp.data;
    });
  }
  ddgetspDuty() {
    this.beatService.getSpecialDutyType().subscribe((resp: any) => {
      this.spType = resp.data;
    });
  }
  reportForm = this.fb.group({userType: ['self'], foUserId: [''], spType: ['', Validators.required], fromDate: [''], toDate: ['']});
  radOnchange(evt) {
    var target = evt.target.value;
      if (target == "fo") {
        this.radUpdate = true;
      } else if(target == "self") {
        this.radUpdate = false;
      }
  }
  get validFormControl() {
    return this.reportForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    const userType = this.reportForm.value.userType;
    const foUser = this.reportForm.value.foUserId;
    const fromDate = this.pipe.transform(this.reportForm.value.fromDate, 'dd-MM-yyyy');
    const toDate = this.pipe.transform(this.reportForm.value.toDate, 'dd-MM-yyyy');
    if (this.reportForm.valid) {
      const spType = this.reportForm.value.spType;
      this.bType = {userType, foUser, spType, fromDate, toDate};
      //console.log("chekdata", this.bType);
      this.beatService.getspdutyReport(this.bType).subscribe((resp: APIResponse) => {
        this.ksLoader = true;
        this.viewTable = false;
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.reportData = resp.data;
            this.viewTable = true;
            // this.sharedService.showDownload(resp.message);
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
  csv_fileDownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Field Duty Details',
      useBom: true,
      headers: ["ID", "Beat Type", "Role", "Role Name"]
    };
    new ngxCsv(this.reportData, "Report", options);
  }
  cancel() {
    this.router.navigate(['/main']);
  }

}
