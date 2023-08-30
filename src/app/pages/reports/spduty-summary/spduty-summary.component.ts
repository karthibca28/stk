import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { BeatService } from 'src/app/shared/services/beat.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-spduty-summary',
  templateUrl: './spduty-summary.component.html',
  styleUrls: ['./spduty-summary.component.scss']
})
export class SpdutySummaryComponent implements OnInit {

  pipe = new DatePipe('en-US');
  title: string = '';
  pv: boolean;
  submitted: boolean;
  reportData: any[] = [];
  reportHeader: any;
  bType: any = "";
  foUser: any[] = [];
  typeBeat: any[] = [];
  spType: any[] = [];
  viewTable: boolean = false;
  radUpdate: boolean = false;
  calc: number = 0;
  highlightData: any[];
  primColor: number = 3;
  ksLoader: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void {
    // Init dropdown data
    this.highlightData = [{name: 'Beat',value: 1}, {name: 'Task', value: 2}, {name: 'Field Duty', value: 3}];
    this.ddFoUser();
    this.ddgetspDutyAll();
  }

  ddFoUser() {
    this.beatService.getFoUser().subscribe((resp: any) => {
      this.foUser = resp.data;
    });
  }
  ddgetspDutyAll() {
    this.beatService.getSpecialDutyTypeAll().subscribe((resp: any) => {
      this.spType = resp.data;
    });
  }
  summaryForm = this.fb.group({userType: ['self'], foUserId: [''], spType: ['', Validators.required], fromDate: [''], toDate: ['']});
  radOnchange(evt) {
    var target = evt.target.value;
      if (target == "fo") {
        this.radUpdate = true;
      } else if(target == "self") {
        this.radUpdate = false;
      }
  }
  eventTrg(event) {
    //console.log(event.value);
    let ngValue = event.value;
    if(ngValue === 1) {
      this.router.navigate(['/main/reports/beat-summary']);
    }else if(ngValue === 2) {
      this.router.navigate(['/main/reports/task-summary']);
    }
  }
  get validFormControl() {
    return this.summaryForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    const userType = this.summaryForm.value.userType;
    const foUser = this.summaryForm.value.foUserId;
    const fromDate = this.pipe.transform(this.summaryForm.value.fromDate, 'dd-MM-yyyy');
    const toDate = this.pipe.transform(this.summaryForm.value.toDate, 'dd-MM-yyyy');
    const spType = this.summaryForm.value.spType;
    if (this.summaryForm.valid) {
      this.bType = {userType, foUser, spType, fromDate, toDate};
      //console.log(this.bType);
      this.beatService.getspdutySummaryReport(this.bType).subscribe((resp: APIResponse) => {
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
      // headers: ["ID", "Beat Type", "Role", "Role Name"]
    };
    new ngxCsv(this.reportData, "Summary Report", options);
  }
  cancel() {
    this.router.navigate(['/main']);
  }

}
