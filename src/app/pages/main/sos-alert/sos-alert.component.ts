import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-sos-alert',
  templateUrl: './sos-alert.component.html',
  styleUrls: ['./sos-alert.component.scss']
})
export class SosAlertComponent implements OnInit {
  dynamaicDataForTable:any

  constructor(private formService: FormService,private router: Router) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.formService.getSOSAlert().subscribe((formData: any) => {
      const values = formData.data.SosAlert;
      const modifiedValues = values.map((value: any) => ({
        ...value,
        createdFullName: value.createdBy?.fullName || ''
      }));
  
      console.log(formData.data);
  
      const cols = [
        { field: 'createdFullName', header: 'Name', type: 'text' },
        { field: 'policeStationName', header: 'PoliceStation Name', type: 'text' },
        { field: 'latitude', header: 'latitude', type: 'text' },
        { field: 'longitude', header: 'longitude', type: 'text' },
      ];
  
      this.dynamaicDataForTable = { cols, values: modifiedValues };
  
      console.log("master", this.dynamaicDataForTable);
    });
  }

  viewRecord(sosAlertId:any){
    this.router.navigate([`main/lot/sos-alert-view`,sosAlertId])
  }
  
}
