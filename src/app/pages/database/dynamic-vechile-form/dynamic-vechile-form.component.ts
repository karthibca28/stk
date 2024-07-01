import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-dynamic-vechile-form',
  templateUrl: './dynamic-vechile-form.component.html',
  styleUrls: ['./dynamic-vechile-form.component.scss']
})
export class DynamicVechileFormComponent implements OnInit {
  form: FormGroup;
  selectedFile: any;
  editMasterId: any;
  editData: any;
  latitude: number;
  longitude: number;
  locationName: string;


  constructor(private fb: FormBuilder, private secondaryService: SecondaryService, private route: ActivatedRoute,
    private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['vehiclePointId'];
    this.initialForm();
    if(this.editMasterId){
      this.editList();
    }
  }

  initialForm() {
    this.form = this.fb.group({
      locationName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required]
    })
  }

  location(data: any) {
    console.log(data)
    this.form.patchValue({
      latitude: data.latitude,
      longitude: data.longitude,
      locationName: data.name.split(", ")[0]
    })
  }
  onSubmit() {
    if (this.form.valid) {
      var formData = new FormData();
      formData.append('locationName', this.form.value.locationName);
      formData.append('latitude', this.form.value.latitude);
      formData.append('longitude', this.form.value.longitude);
      formData.append('files', this.selectedFile);
      this.secondaryService.addVehiclePoint(formData).subscribe((res: any) => {
        if(res){
          this.sharedService.showSuccess('Dynamic Vechile Point Added Successfully');
          this.router.navigate(['/main/database/dynamic-vechile'])
          }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  editList(){
    this.secondaryService.viewDynamicVechilePoint(this.editMasterId).subscribe((res: any) => {
      this.editData = res.data;
      this.form.patchValue({
        locationName: res.data.locationName,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      });
      this.latitude = res.data.latitude;
      this.longitude = res.data.longitude;
      this.locationName = res.data.locationName;
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
