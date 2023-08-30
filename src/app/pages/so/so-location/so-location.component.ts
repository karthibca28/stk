import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-so-location',
  templateUrl: './so-location.component.html',
  styleUrls: ['./so-location.component.scss']
})
export class SoLocationComponent implements OnInit {
  cols: any[];
  beatList: any;
  tableData:any[]=[];
  dynamaicDataForTable: any; 

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getLocationListWeb();
  }

  getLocationListWeb() {
    this.formService.getLocationListWeb().subscribe((resp: APIResponse) => {
      this.dynamaicDataForTable = resp.data;
      //console.log("User list Web-", this.dynamaicDataForTable);
    })
  }
  cancel() {
    this.router.navigate(['/main/so']);
  }
}
