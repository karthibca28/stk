import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LocationService } from 'src/app/shared/services/location.service';

@Component({
  selector: 'app-duty-points-form',
  templateUrl: './duty-points-form.component.html',
  styleUrls: ['./duty-points-form.component.scss']
})
export class DutyPointsFormComponent implements OnInit {
  
  form: FormGroup;
  editMasterId:any
  dutyPoints:any=[]
  mapData: any[]=[];
  latitude: number;
  longitude: number;
  latitudedata: number;
  longitudedata: number;
  constructor(private route: ActivatedRoute,private formBuilder: FormBuilder,private formService: FormService,
    private locationService: LocationService) {
    }
    
    ngOnInit(): void {
      this.editMasterId = this.route.snapshot.params['dutyPointId'];
      console.log(this.route.snapshot.params['dutyPointId'])
      this.form = this.formBuilder.group({
      pointType: ['', Validators.required], // Add your form controls here
      status: ['', Validators.required],
      latitude:({ value: 'initialLatitudeValue', disabled: true }),
      longitude:({ value: 'initialLongitudeValue', disabled: true })
    
    });
        this.formService.getDutyPointsforSeniorOfficerbyId(this.editMasterId).subscribe((formData: any) => {
      this.dutyPoints = formData.data
      this.form.patchValue({
        pointType: formData.data.pointType,
        status: formData.data.status,
        latitude: formData.data.latitude,
        longitude: formData.data.longitude,

      });
      this.latitude = parseFloat(formData.data.latitude);
      this.longitude = parseFloat(formData.data.longitude);
      
  })
  this.locationService.getLocationData().subscribe(data => {
    if (data) {
      this.form.patchValue({
  
        latitude: data.latitude,
        longitude: data.longitude

      });
      this.latitude = data.latitude;
      this.longitude = data.longitude;
    }
  });

}

}
