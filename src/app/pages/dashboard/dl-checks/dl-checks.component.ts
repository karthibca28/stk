import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-dl-checks',
  templateUrl: './dl-checks.component.html',
  styleUrls: ['./dl-checks.component.scss']
})
export class DlChecksComponent implements OnInit {

  public formData!: JsonFormData;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  dynamaicDataForTable: any;
  constructor(private router: Router,private secondaryservice:SecondaryService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.secondaryservice.getDlCheck().subscribe((resp: any) => {
      const values = resp.data.map(item => {
        return {
          // id: item.id,
          policeStation: item.policeStation.name,
          vechicleName: item.vehicleCheck.name,
          RcNo: item.vehicleCheck.rcNo,
        };
      });
  
      const cols = [
        // { field: 'id', header: 'id', type: 'text' },
        { field: 'policeStation', header: 'PoliceStation', type: 'text' },
        { field: 'vechicleName', header: 'vechicleName', type: 'text' },
        { field: 'RcNo', header: 'Rc No', type: 'text' },
      ];
        this.dynamaicDataForTable = {cols, values};
        console.log("master",this.dynamaicDataForTable)
    });
  }
  editRecord(adminId:any){
    this.router.navigate([`main/master/administration-form`,adminId])
  }
  deleteRecord(stateId:number){
  }

}
