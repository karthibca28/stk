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
  selector: 'app-so-summary-report',
  templateUrl: './so-summary-report.component.html',
  styleUrls: ['./so-summary-report.component.scss']
})
export class SoSummaryReportComponent implements OnInit {
 

  constructor() { }

  ngOnInit(): void {
  
  }
  

}
