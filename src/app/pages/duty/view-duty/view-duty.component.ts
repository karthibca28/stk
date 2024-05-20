import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-view-duty',
  templateUrl: './view-duty.component.html',
  styleUrls: ['./view-duty.component.scss']
})
export class ViewDutyComponent implements OnInit {

  form: FormGroup;
  location: any;
  dutyType = [
    { id: "JUNCTION_POINT", name: "JUNCTION POINT"},
    { id: "VEHICLE_CHECK", name: "VEHICLE CHECK"},
    { id: "VIP_ROUTES", name: "VIP ROUTES"},
    { id: "SECTOR_DUTY", name: "SECTOR DUTY"},
    { id: "PATROL_DUTY", name: "PATROL DUTY"}
  ];
  assignedTo: any;
  constructor(private fb: FormBuilder, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.initialForm();
    this.getLocations();
    this.getAssignOfficer();
  }

  initialForm(){
    this.form = this.fb.group({
      dutyType: ['', Validators.required],
      assignedTo: ['', Validators.required],
      startDate: ['',Validators.required],
      endDate: ['', Validators.required],
      startLocationId: ['', Validators.required],
      startLatitude: ['', Validators.required],
      startLongitude: ['', Validators.required],
      endLocationId: ['', Validators.required],
      endLatitude:['', Validators.required],
      endLongitude: ['', Validators.required]
    })
  }

  getLocations(){
    this.secondaryService.getLocations().subscribe((res: any) => {
      this.location = res.data;
    })
  }

  getAssignOfficer(){
    this.secondaryService.getOfficer().subscribe((res: any) =>{
      this.assignedTo = res.data
    })
  }

  onLocationChange(event: any, locationType: string) {
    const locationId = event.value;
    const selectedLocation = this.location.find(loc => loc.id === locationId);
    if (selectedLocation) {
      if (locationType === 'start') {
        this.form.patchValue({
          startLatitude: selectedLocation.latitude,
          startLongitude: selectedLocation.longitude
        });
      } else {
        this.form.patchValue({
          endLatitude: selectedLocation.latitude,
          endLongitude: selectedLocation.longitude
        });
      }
    }
  }

  onSubmit(){
    const currentDateTime = new Date();
    const startDateTime = new Date(this.form.value.startDate);
    const endDateTime = new Date(this.form.value.endDate);
    startDateTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
    endDateTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
    const formattedStartDateTime = this.formatDateTime(startDateTime);
    const formattedEndDateTime = this.formatDateTime(endDateTime);
    if(this.form.valid){
    const data = {
      "dutyType": this.form.value.dutyType,
      "assignedTo": this.form.value.assignedTo,
      "startLocationId": this.form.value.startLocationId,
      "endLocationId": this.form.value.endLocationId,
      "startLatitude": this.form.value.startLatitude,
      "startLongitude": this.form.value.startLongitude,
      "endLatitude": this.form.value.endLatitude,
      "endLongitude": this.form.value.endLongitude,
      "startDate": formattedStartDateTime,
      "endDate": formattedEndDateTime
    }
    this.secondaryService.assignDuty(data).subscribe((res: any) => {
      console.log("res added", res)
    })
  } else {
    this.form.markAllAsTouched();
  }
    
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
