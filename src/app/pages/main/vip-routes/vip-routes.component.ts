import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-vip-routes',
  templateUrl: './vip-routes.component.html',
  styleUrls: ['./vip-routes.component.scss']
})
export class VIPRoutesComponent implements OnInit {

  dynamaicDataForTable:any;
  selected ='all'

  constructor(private formService: FormService,) { }

  ngOnInit(): void {
    this.getList()
  }

  onSelectionChange(event: any) {
    this.selected = event.value;
    // this.getList();
  }

  getList() {
    this.formService.getVipRoutesforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data)
      const cols = [
        { field: 'startLocationName', header: 'Start Location Name', type: 'text' },
        { field: 'endLocationName', header: 'End Location Name', type: 'text' },
        { field: 'administrationName', header: 'Administration Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
  });
  }
  editRecord(dutyPointId:any){
    // this.router.navigate([`main/lot/dutPoints-form`,dutyPointId])
  //   this.formService.getDutyPointsforSeniorOfficerbyId(dutyPointId).subscribe((formData: any) => {
  //     this.dutyPoints = formData.data
  //     this.form.patchValue({
  //       pointType: formData.data.pointType,
  //       status: formData.data.status,
  //       latitude: formData.data.latitude,
  //       longitude: formData.data.longitude,

  //     });
  // });
  //   this.display = true;
  }
  deleteRecord(stateId:number){
  }

}
