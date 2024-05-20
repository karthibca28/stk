import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecondaryService } from 'src/app/shared/services/secondary.service';

@Component({
  selector: 'app-duty-form',
  templateUrl: './duty-form.component.html',
  styleUrls: ['./duty-form.component.scss']
})
export class DutyFormComponent implements OnInit {
  form: FormGroup;
  selectedFile: any;


  constructor(private fb: FormBuilder, private secondaryService: SecondaryService) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm(){
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
      longitude:data.longitude,
      locationName: data.name.split(", ")[0]
    })
  }
  onSubmit(){
    if(this.form.valid){
    var formData = new FormData();
    formData.append('locationName', this.form.value.locationName);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);
    formData.append('files', this.selectedFile);
    this.secondaryService.addVehiclePoint(formData).subscribe((res: any) => {
      console.log("res", res)
    })
  } else {
    this.form.markAllAsTouched();
  }
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
