import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-duty-points',
  templateUrl: './duty-points.component.html',
  styleUrls: ['./duty-points.component.scss']
})
export class DutyPointsComponent implements OnInit {

  constructor(private route: ActivatedRoute,private formService: FormService,private formBuilder: FormBuilder,private router: Router) { }

  form: FormGroup;
  dynamaicDataForTable: any;
  display: boolean;
  dutyPoints:any=[]
  mapData: any[]=[];
  
  ngOnInit(): void {
  this.getList();   
  }

  getList() {
    this.formService.getDutyPointsforSeniorOfficer().subscribe((formData: any) => {
        const values = formData.data;
        const cols = [
          { field: 'locationName', header: 'Location Name', type: 'text' },
          { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
          { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
        ];
        this.dynamaicDataForTable = {cols, values};
        console.log("master",this.dynamaicDataForTable)
    });
  }

  editRecord(dutyPointId:any){
    this.router.navigate([`main/lot/dutPoints-form`,dutyPointId])
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
