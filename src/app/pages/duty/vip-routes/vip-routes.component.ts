import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-vip-routes',
  templateUrl: './vip-routes.component.html',
  styleUrls: ['./vip-routes.component.scss']
})
export class VipRoutesComponent implements OnInit {
  form: FormGroup;
  locations: any;
  showAdditionalFields: boolean = false;
  types = [
    { id: "SINGLE_CAR", name: "SINGLE CAR"},
    { id: "CONVOY", name: "CONVOY"}
  ]
  constructor( private fb: FormBuilder, private secondaryService: SecondaryService,  private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.initialForm();
    this.getLocations();
  }

  initialForm(){
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      startDateTime: ['', Validators.required],
      endDateTime: ['', Validators.required],
      startLocationId: ['', Validators.required],
      startLocationName: ['', Validators.required],
      startLocationLat: ['', Validators.required],
      startLocationLng: ['', Validators.required],
      endLocationId: ['', Validators.required],
      endLocationName: ['', Validators.required],
      endLocationLat: ['', Validators.required],
      endLocationLng: ['', Validators.required],
      isGoogleLocation: new FormControl(false),
    })
  }

  toggleFields(checked: boolean) {
    this.showAdditionalFields = checked;
  }

  location(data: any) {
      console.log("data", data)
      const startLocation = data[0];
      this.form.patchValue({
        startLocationLat: startLocation.latitude,  
        startLocationLng: startLocation.longitude,
        startLocationName: startLocation.locationName.split(", ")[0]
      });
    
      const endLocation = data[1];
      this.form.patchValue({
        endLocationLat: endLocation.latitude,  
        endLocationLng: endLocation.longitude,
        endLocationName: endLocation.locationName.split(", ")[0]
      });
    }

    getLocations(){
      this.secondaryService.getLocation().subscribe((res: any) => {
        this.locations = res.data;
      })
    }
  
    onLocationChange(event: any, locationType: string) {
      const locationId = event.value;
      const selectedLocation = this.locations.find(loc => loc.id === locationId);
      if (selectedLocation) {
        if (locationType === 'start') {
          this.form.patchValue({
            startLocationLat: selectedLocation.latitude,
            startLocationLng: selectedLocation.longitude
          });
        } else if(locationType === 'end') {
          this.form.patchValue({
            endLocationLat: selectedLocation.latitude,
            endLocationLng: selectedLocation.longitude
          });
        }
      }
    }

    onSubmit() {
      const currentDateTime = new Date();
      const startDateTime = new Date(this.form.value.startDateTime);
      const endDateTime = new Date(this.form.value.endDateTime);
      startDateTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
      endDateTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
      const formattedStartDateTime = this.formatDateTime(startDateTime);
      const formattedEndDateTime = this.formatDateTime(endDateTime);
      // if(this.form.valid){
      const data = {
          "name": this.form.value.name,
          "type": this.form.value.type,
          "startDateTime": formattedStartDateTime,
          "endDateTime": formattedEndDateTime,
          "isGoogleLocation": this.form.value.isGoogleLocation
      };
  
      if (this.form.value.isGoogleLocation) {
          data["startLocationName"] = this.form.value.startLocationName;
          data["startLocationLat"] = this.form.value.startLocationLat;
          data["startLocationLng"] = this.form.value.startLocationLng;
          data["endLocationName"] = this.form.value.endLocationName;
          data["endLocationLat"] = this.form.value.endLocationLat;
          data["endLocationLng"] = this.form.value.endLocationLng;
      } else {
          data["startLocationId"] = this.form.value.startLocationId;
          data["startLocationLat"] = this.form.value.startLocationLat;
          data["startLocationLng"] = this.form.value.startLocationLng;
          data["endLocationId"] = this.form.value.endLocationId;
          data["endLocationLat"] = this.form.value.endLocationLat;
          data["endLocationLng"] = this.form.value.endLocationLng;
      }
  
      this.secondaryService.addVipRoute(data).subscribe((res: any) => {
        if(res){
          this.sharedService.showSuccess('VIP Routes Added Successfully');
          this.router.navigate(['/main/duty/vip-routes'])
          }
      });
    // } else {
    //   this.form.markAllAsTouched();
    // }
  }
  

    formatDateTime(dateTime: Date): string {
      const year = dateTime.getFullYear();
      const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
      const date = dateTime.getDate().toString().padStart(2, '0');
      const hours = dateTime.getHours().toString().padStart(2, '0');
      const minutes = dateTime.getMinutes().toString().padStart(2, '0');
      const seconds = dateTime.getSeconds().toString().padStart(2, '0');
      
      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    }

}
