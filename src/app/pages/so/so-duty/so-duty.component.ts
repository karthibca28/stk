import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-so-duty',
  templateUrl: './so-duty.component.html',
  styleUrls: ['./so-duty.component.scss']
})
export class SoDutyComponent implements OnInit {
  cols: any[];
  beatList: any;
  tableData:any[]=[];
  dynamaicDataForTable: any; 

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getDutyListWeb();
  }

  getDutyListWeb() {
    const sData = {"searchType": "active"};
    this.formService.getDutyListWeb(sData).subscribe((resp: APIResponse) => {
      this.dynamaicDataForTable = resp.data;
      //console.log("Beat list Web-", this.dynamaicDataForTable);
    })
  }
  cancel() {
    this.router.navigate(['/main/so']);
  }

}
