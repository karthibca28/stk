import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-so-task',
  templateUrl: './so-task.component.html',
  styleUrls: ['./so-task.component.scss']
})
export class SoTaskComponent implements OnInit {
  cols: any[];
  beatList: any;
  tableData:any[]=[];
  dynamaicDataForTable: any; 

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getTaskListWeb();
  }

  getTaskListWeb() {
    const sData = {"searchType": "active"};
    this.formService.getTaskListWeb(sData).subscribe((resp: APIResponse) => {
      this.dynamaicDataForTable = resp.data;
      //console.log("Beat list Web-", this.dynamaicDataForTable);
    })
  }
  cancel() {
    this.router.navigate(['/main/so']);
  }

}
