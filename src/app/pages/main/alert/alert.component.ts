import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  dynamaicDataForTable:any

  constructor(private formService: FormService,private router: Router) { }

  ngOnInit(): void {
    this.getList()
  }
  getList() {
    this.formService.getSOSAlert().subscribe((formData: any) => {
      const values = formData.data.AmbulanceAlert;
      console.log(formData.data)
      const cols = [
        { field: 'locationName', header: 'Location Name', type: 'text' },
        { field: 'policeStationName', header: 'PoliceStation Name', type: 'text' },
        { field: 'latitude', header: 'latitude', type: 'text' },
        { field: 'longitude', header: 'longitude', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
  });
  }

}
