import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-duty-points-form',
  templateUrl: './duty-points-form.component.html',
  styleUrls: ['./duty-points-form.component.scss']
})
export class DutyPointsFormComponent implements OnInit {

  form: FormGroup;
  editMasterId: any
  dutyPoints: any = []
  mapData: any[] = [];
  latitude: number;
  longitude: number;
  latitudedata: number;
  longitudedata: number;
  selectedFile: any;
  pointTypes = [
    { id: "LOCATION_POINT", name: "LOCATION POINT" },
    { id: "OTHER_POINT", name: "OTHER POINT" }
  ]
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private formService: FormService,
    private locationService: LocationService, private secondaryService: SecondaryService) {
  }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['dutyPointId'];
    console.log(this.route.snapshot.params['dutyPointId'])
    this.form = this.formBuilder.group({
      pointType: ['', Validators.required],
      locationName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    });
    this.formService.getDutyPointsforSeniorOfficerbyId(this.editMasterId).subscribe((formData: any) => {
      this.dutyPoints = formData.data
      this.form.patchValue({
        pointType: formData.data.pointType,
        //status: formData.data.status,
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

  location(data: any) {
    console.log(data)
    this.form.patchValue({
      latitude: data.latitude,  
      longitude:data.longitude
    })
  }
  onSubmit(){
    var formData = new FormData();
    formData.append('locationName', this.form.value.locationName);
    formData.append('pointType', this.form.value.pointType);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);
    formData.append('files', this.selectedFile);
    this.secondaryService.addDuty(formData).subscribe((res: any) => {
      console.log("res", res)
    })
  }

  onFileSelected(event: any, fileType: string) {
    const fileInput = event.target;
    switch (fileType) {
      case 'file':
        this.selectedFile = fileInput.files?.[0];
        break;
      default:
        break;
    }
  }

}
