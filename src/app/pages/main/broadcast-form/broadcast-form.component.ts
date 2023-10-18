import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-broadcast-form',
  templateUrl: './broadcast-form.component.html',
  styleUrls: ['./broadcast-form.component.scss']
})
export class BroadcastFormComponent implements OnInit {
   @ViewChild('videoElement') videoElement: ElementRef;
   isCameraOpen: boolean = false;
   photoData: string | null = null;
  form!: FormGroup;
   zoneList:any
   rangeList:any
   districtList:any
   subDivisionList:any
   adminList:any
   stateList:any
   policeStationList:any
   data:any = {}

  constructor(private masterService:MasterService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [''],
      message: ['',],
      stateId:[''],
      adminId:[''],
      zoneId:[''],
      rangeId:[''],
      districtId:[''],
      subDivisionId:[''],
      policeStationId:[''],
      description: ['']
    });
    this.getZoneList()
    this.getRangeList()
    this.getDistrictList()
    this.getSubDivision()
    this.getAdminList()
    this.getStateList()
    this.getPoliceStaion()
    this.getAccessControl()
  }

  getStateList() {
    this.masterService.stateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }

  getAdminList() {
    this.masterService.adminList().subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }


  getZoneList() {
    this.masterService.zone().subscribe((resp: any) => {
       this.zoneList = resp.data
    });
  }

  getRangeList() {
    this.masterService.range().subscribe((resp: any) => {
       this.rangeList = resp.data
    });
  }
   getDistrictList() {
    this.masterService.district().subscribe((resp: any) => {
       this.districtList = resp.data
    });
  }
  getSubDivision() {
    this.masterService.subDivision().subscribe((resp: any) => {
       this.subDivisionList = resp.data
    });
  }
  getPoliceStaion() {
    this.masterService.policeStation().subscribe((resp: any) => {
       this.policeStationList = resp.data
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data; 
    });
  }
  

  openCamera() {
    const video = this.videoElement.nativeElement;

    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          video.srcObject = stream;
          video.play();
          this.isCameraOpen = true;
        })
        .catch(error => console.error('Error accessing the camera:', error));
    } else {
      console.error('getUserMedia is not supported on this browser');
    }
  }
  submit(){
    
  }

  takePhoto() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');

    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.photoData = canvas.toDataURL('image/png');
    }
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement?.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      console.log('Selected file:', file);
    }
  }

}
