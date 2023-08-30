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
  selector: 'app-mis-reports',
  templateUrl: './mis-reports.component.html',
  styleUrls: ['./mis-reports.component.scss']
})
export class MisReportsComponent implements OnInit {
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
  isDetailPage: boolean = true;
  isSumaryPage: boolean = false;
  viewTable: boolean = false;
  calc: number = 0;
  highlightData: any[];
  primColor: string = "on";
  ksLoader: boolean = false;

  constructor(private fb: FormBuilder, private formService: FormService, public router: Router, private sharedService: SharedService, private beatService: BeatService) { }

  ngOnInit(): void {
   this.ddFoUser();
   this.ddgetBeat();
   
   this.highlightData = [{name: 'Beat',value: 'on'}, {name: 'Task', value: '2'}, {name: 'Field Duty', value: '3'}];
  }
  eventTrg(event) {
    //console.log(event.value);
    let ngValue = event.value;
    if(ngValue === '2') {
      this.router.navigate(['/main/reports/task-report']);
    }else if(ngValue === '3') {
      this.router.navigate(['/main/reports/spduty-report']);
    }
  }
  ddFoUser() {
    this.beatService.getFoUser().subscribe((resp: any) => {
      this.foUser = resp.data;
    });
  }
  ddgetBeat() {
    this.beatService.getBeatType().subscribe((resp: any) => {
      this.typeBeat = resp.data;
      //console.log("beat", this.typeBeat);
    });
  }
  reportForm = this.fb.group({
    foUserId: ['', Validators.required ],
    beatType: ['', Validators.required ],
    fromDate: [''],
    toDate: ['']
  });
  get validFormControl() {
    return this.reportForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.reportForm.valid) {
      const foUser = this.reportForm.value.foUserId;
      const beatType = this.reportForm.value.beatType;
      const fromDate = this.pipe.transform(this.reportForm.value.fromDate, 'dd-MM-yyyy');
      const toDate = this.pipe.transform(this.reportForm.value.toDate, 'dd-MM-yyyy');
      this.bType = {foUser, beatType, fromDate, toDate};
      this.beatService.getBeatReport(this.bType).subscribe((resp: APIResponse) => {
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
    // else {
    //   this.sharedService.showError('Not valid');
    // }
  }
  
  csv_fileDownload() {
    var options = { 
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'Beat Details',
      useBom: true,
      // headers: ["ID", "Beat Type", "Role", "Role Name"]
    };
    new ngxCsv(this.reportData, "Report", options);
  }

  cancel() {
    this.router.navigate(['/main']);
  }
}
