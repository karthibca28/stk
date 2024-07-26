import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
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
  fileError: string;


  constructor(private fb: FormBuilder, private secondaryService: SecondaryService, private route: ActivatedRoute,
    private sharedService: SharedService, private router: Router, private formService: FormService) { }

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
    if (this.form.valid && this.selectedFile) {
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
      if (!this.selectedFile) {
        this.fileError = 'File is required';
      }
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

  async downloadAttachment(attachment: any): Promise<void> {
    try {
      const response = await this.formService.getFileForBroadCast(attachment.downloadPath);
      if (!response) {
        throw new Error('Invalid file response');
      }
      this.downloadFile(response, attachment.orgFileName);
    } catch (error) {
      console.error('Error fetching or processing file:', error);
    }
  }

  downloadFile(file: Blob, fileName: string): void {
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(file);
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  
  onFileSelected(event: any, fileType: string) {
    const fileInput = event.target;
    if (fileType === 'file') {
      this.selectedFile = fileInput.files?.[0];
      if (this.selectedFile) {
        this.fileError = ''; 
      } else {
        this.fileError = 'File is required';
      }
    }
  }
  

}
