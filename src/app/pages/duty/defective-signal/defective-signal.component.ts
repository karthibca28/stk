import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-defective-signal',
  templateUrl: './defective-signal.component.html',
  styleUrls: ['./defective-signal.component.scss']
})
export class DefectiveSignalComponent implements OnInit {
  form: FormGroup;
  selectedFile: any;

  constructor(private fb: FormBuilder, private secondaryService: SecondaryService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm() {
    this.form = this.fb.group({
      locationName: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      description: ['', Validators.required]
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
      formData.append('location', this.form.value.locationName);
      formData.append('latitude', this.form.value.latitude);
      formData.append('longitude', this.form.value.longitude);
      formData.append('description', this.form.value.description);
      formData.append('files', this.selectedFile)
      this.secondaryService.addDefectiveSignal(formData).subscribe((res: any) => {
        if(res){
        this.sharedService.showSuccess('Defective Signal Added Successfully');
        this.router.navigate(['/main/duty/defective-signal-list'])
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const fileInput = event.target;
    this.selectedFile = fileInput.files?.[0];
  }
}
