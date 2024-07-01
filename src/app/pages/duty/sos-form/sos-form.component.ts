import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-sos-form',
  templateUrl: './sos-form.component.html',
  styleUrls: ['./sos-form.component.scss']
})
export class SOSFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private secondaryService: SecondaryService, private sharedService: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.initialForm();
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
      const data = {
        "latitude": this.form.value.locationName,
        "longitude": this.form.value.longitude,
        "locationName": this.form.value.latitude
      }
      this.secondaryService.addSOSAlert(data).subscribe((res: any) => {
        if (res) {
          this.sharedService.showSuccess('SOS Added Successfully');
          this.router.navigate(['/main/duty/sos-list'])
        }
      })
    } else {
      this.form.markAllAsTouched();
    }
  }
}
