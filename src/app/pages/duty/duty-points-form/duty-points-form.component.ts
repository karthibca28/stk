import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { SecondaryService } from 'src/app/shared/services/secondary.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-duty-points-form',
  templateUrl: './duty-points-form.component.html',
  styleUrls: ['./duty-points-form.component.scss']
})
export class DutyPointsFormComponent implements OnInit {
  form: FormGroup;
  editMasterId: any;
  editData: any;
  dutyPoints: any = []
  mapData: any[] = [];
  latitude: number;
  longitude: number;
  locationName: string;
  latitudedata: number;
  longitudedata: number;
  selectedFile: any;
  isFileLoaded: boolean = false
  fileUrl: SafeResourceUrl;
  fileType: string = 'application/pdf'
  pointTypes = [
    { id: "LOCATION_POINT", name: "LOCATION POINT" },
    { id: "OTHER_POINT", name: "OTHER POINT" }
  ]
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private formService: FormService,
    private locationService: LocationService, private secondaryService: SecondaryService, private sanitizer: DomSanitizer, private sharedService: SharedService, private router: Router) {
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
    if (this.editMasterId) {
      this.editList()
    }
    // this.formService.getDutyPointsforSeniorOfficerbyId(this.editMasterId).subscribe((formData: any) => {
    //   this.dutyPoints = formData.data
    //   this.form.patchValue({
    //     pointType: formData.data.pointType,
    //     //status: formData.data.status,
    //     latitude: formData.data.latitude,
    //     longitude: formData.data.longitude,

    //   });
    //   this.latitude = parseFloat(formData.data.latitude);
    //   this.longitude = parseFloat(formData.data.longitude);

    // })
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
      longitude: data.longitude
    });
    this.latitude = data.latitude;
    this.longitude = data.longitude;
    this.locationName = data.name;
  }
  onSubmit() {
    var formData = new FormData();
    formData.append('locationName', this.form.value.locationName);
    formData.append('pointType', this.form.value.pointType);
    formData.append('latitude', this.form.value.latitude);
    formData.append('longitude', this.form.value.longitude);
    formData.append('files', this.selectedFile);
    this.secondaryService.addDuty(formData).subscribe((res: any) => {
      if(res){
        this.sharedService.showSuccess('Duty Points Added Successfully');
        this.router.navigate(['/main/duty/duty-point-list'])
        }
    })
  }

  editList() {
    this.secondaryService.viewDutyPoints(this.editMasterId).subscribe((res: any) => {
      this.editData = res.data;
      this.form.patchValue({
        locationName: res.data.locationName,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
      });
      this.latitude = res.data.latitude;
      this.longitude = res.data.longitude;
      this.locationName = res.data.locationName;
      this.selectedFile = res.data.attachment[0].orgFileName;
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

  async viewFiles(data: any, fileType: string): Promise<void> {
    console.log(data.fileName)
    try {
      const res = await this.formService.getFileForBroadCast(data?.downloadPath);
      if (!res) {
        throw new Error('Invalid file response');
      }

      this.fileType = res.type;
      console.log(res.type);

      if (this.fileType == 'application/pdf') {
        console.warn("Displaying PDF");
        const fileUrl = await this.getPdfUrl(res);
        this.fileUrl = fileUrl;
      } else {
        console.warn("Downloading file directly");
        this.downloadFile(res, data.fileName);
      }
    } catch (e) {
      console.error('Error fetching or processing file:', e);
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

  getPdfUrl(e: Blob): SafeResourceUrl {
    const pdfUrl = URL.createObjectURL(e);
    console.log("Select files", pdfUrl);
    this.isFileLoaded = true;
    return this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
  }
}
