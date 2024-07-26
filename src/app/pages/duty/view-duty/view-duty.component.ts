import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-view-duty',
  templateUrl: './view-duty.component.html',
  styleUrls: ['./view-duty.component.scss']
})
export class ViewDutyComponent implements OnInit {
  editMasterId: any;
  form: FormGroup;
  location: any;
  editData: any;
  latitude: number;
  longitude: number;
  minEndDate: Date;
  locationName: string;
  dutyType = [
    { id: "JUNCTION_POINT", name: "JUNCTION POINT" },
    { id: "VEHICLE_CHECK", name: "VEHICLE CHECK" },
    { id: "VIP_ROUTES", name: "VIP ROUTES" },
    { id: "SECTOR_DUTY", name: "SECTOR DUTY" },
    { id: "PATROL_DUTY", name: "PATROL DUTY" }
  ];
  assignedTo: any;
  constructor(private fb: FormBuilder, private secondaryService: SecondaryService, private route: ActivatedRoute,
    private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['dutyId'];
    this.initialForm();
    this.getLocations();
    this.getAssignOfficer();
    if(this.editMasterId){
      this.editList()
    }
  }

  initialForm() {
    this.form = this.fb.group({
      dutyType: ['', Validators.required],
      assignedTo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startLocationId: ['', Validators.required],
      startLatitude: ['', Validators.required],
      startLongitude: ['', Validators.required],
      endLocationId: ['', Validators.required],
      endLatitude: ['', Validators.required],
      endLongitude: ['', Validators.required]
    })
  }

  getLocations() {
    this.secondaryService.getLocation().subscribe((res: any) => {
      this.location = res.data;
    })
  }

  getAssignOfficer() {
    this.secondaryService.getOfficer().subscribe((res: any) => {
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

  onSubmit() {
    const currentDateTime = new Date();
    const startDateTime = new Date(this.form.value.startDate);
    const endDateTime = new Date(this.form.value.endDate);
    startDateTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
    endDateTime.setHours(currentDateTime.getHours(), currentDateTime.getMinutes(), currentDateTime.getSeconds());
    const formattedStartDateTime = this.formatDateTime(startDateTime);
    const formattedEndDateTime = this.formatDateTime(endDateTime);
    if (this.form.valid) {
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
        if(res){
          this.sharedService.showSuccess('Duty Added Successfully');
          this.router.navigate(['/main/duty/duty-list'])
          }
      })
    } else {
      this.form.markAllAsTouched();
    }

  }

  editList(){
    this.secondaryService.viewDuty(this.editMasterId).subscribe((res: any) => {
      this.editData = res.data;
      const assignedToName = res.data.assignedTo.length > 0 ? res.data.assignedTo[0].name : '';
      this.form.patchValue({
        dutyType: res.data.dutyType,
        assignedTo: assignedToName,
        startDate: res.data.dutyStartDate,
        endDate: res.data.dutyEndDate,
        startLocationId: res.data.startLocationName,
        startLatitude: res.data.startLatitude,
        startLongitude: res.data.startLongitude,
        endLocationId: res.data.endLocationName,
        endLatitude: res.data.endLatitude,
        endLongitude: res.data.endLongitude,
      });
    })
  }

  onStartDateChange(event: any) {
    const startDate = new Date(event.value);
    this.minEndDate = startDate; 
    if (this.form.get('endDateTime').value) {
      const endDate = new Date(this.form.get('endDateTime').value);
      if (endDate < this.minEndDate) {
        this.form.get('endDateTime').setValue(null);
      }
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
