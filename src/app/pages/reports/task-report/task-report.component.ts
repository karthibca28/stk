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
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.scss']
})
export class TaskReportComponent implements OnInit {

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
  taskType: any[] = [];
  spAllType: any[] = [];
  radUpdate: boolean = false;
  detailPage: boolean = false;
  highlightData: any[];
  primColor: string = "on";
  ksLoader: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void {
    // Init dropdown data
    this.ddFoUser();
    this.ddgetspDuty();

    this.highlightData = [{name: 'Beat',value: '1'}, {name: 'Task', value: 'on'}, {name: 'Field Duty', value: '3'}];
  }

  eventTrg(event) {
    //console.log(event.value);
    let ngValue = event.value;
    if(ngValue === '1') {
      this.router.navigate(['/main/reports/mis-reports']);
    }else if(ngValue === '3') {
      this.router.navigate(['/main/reports/spduty-report']);
    }
  }
  ddFoUser() {
    this.beatService.getFoUser().subscribe((resp: any) => {
      this.foUser = resp.data;
    });
  }
  ddgetspDuty() {
    this.beatService.getFieldTaskType().subscribe((resp: any) => {
      //this.taskType = resp.data;
      // var obj = {
      //   id: "all",
      //   name: "All"
      // };
      this.taskType = resp.data;
    });
  }
  reportForm = this.fb.group({userType: ['self'], foUserId: [''], taskType: ['', Validators.required], fromDate: [''], toDate: ['']});
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
    const taskType = this.reportForm.value.taskType;
    if (this.reportForm.valid) {
      this.bType = {userType, foUser, taskType, fromDate, toDate};
      //console.log(this.bType);
      this.beatService.getTaskDetailReport(this.bType).subscribe((resp: APIResponse) => {
          this.ksLoader = true;
          this.detailPage = false;
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.reportData = resp.data;
            this.detailPage = true;
            //this.sharedService.showDownload(resp.message);
          }, 2400);
        } else {
          this.ksLoader = false;
          this.sharedService.showError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    } else {
     // console.log('Form not valid');
    }
  }
  
  csv_fileDownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Task Details',
      useBom: true,
    };
    new ngxCsv(this.reportData, "Report", options);
  }
  cancel() {
    this.router.navigate(['/main']);
  }

}
