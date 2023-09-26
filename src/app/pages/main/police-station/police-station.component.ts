import { Component, OnInit } from '@angular/core';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-police-station',
  templateUrl: './police-station.component.html',
  styleUrls: ['./police-station.component.scss']
})
export class PoliceStationComponent implements OnInit {

  dynamaicDataForTable:any
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
    this.formService.getPoliceStationforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data)
      const cols = [
        { field: 'code', header: 'Code', type: 'text' },
        { field: 'name', header: 'Name', type: 'text' },
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
