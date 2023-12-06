import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

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
   documentfile:any
   data:any = {}
   documentfiles:any[] = [{}]; 
   selectedFiles: File[] = [];

  constructor(private router: Router, private formBuilder: FormBuilder, 
    private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
      this.form = this.formBuilder.group({
        title: [''],
        message: ['',],
        // stateId:[''],
        adminId:[''],
        zoneId:[''],
        rangeId:[''],
        districtId:[''],
        subDivisionId:[''],
        policeStationId:[''],
        files:['']
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
    this.masterService.commonStateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }

  getAdminList() {
    this.masterService.commonAdminList().subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }


  getZoneList() {
    this.masterService.commonZone().subscribe((resp: any) => {
       this.zoneList = resp.data
    });
  }

  getRangeList() {
    this.masterService.commonRange().subscribe((resp: any) => {
       this.rangeList = resp.data
    });
  }
   getDistrictList() {
    this.masterService.commonDistrict().subscribe((resp: any) => {
       this.districtList = resp.data
    });
  }
  getSubDivision() {
    this.masterService.commonSubDivision().subscribe((resp: any) => {
       this.subDivisionList = resp.data
    });
  }
  getPoliceStaion() {
    this.masterService.commonPoliceStation().subscribe((resp: any) => {
       this.policeStationList = resp.data
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data; 
    });
  }
  
  addNewSet() {
    this.documentfiles.push({});
    this.selectedFiles.push(null);
  }
  minusNewSet(index) {
    if (index >= 0 && index < this.documentfiles.length) {
      this.documentfiles.splice(index, 1);
      this.selectedFiles.splice(index, 1);
    }
  }
  

  // openCamera() {
  //   const video = this.videoElement.nativeElement;

  //   if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  //     navigator.mediaDevices.getUserMedia({ video: true })
  //       .then(stream => {
  //         video.srcObject = stream;
  //         video.play();
  //         this.isCameraOpen = true;
  //       })
  //       .catch(error => console.error('Error accessing the camera:', error));
  //   } else {
  //     console.error('getUserMedia is not supported on this browser');
  //   }
  // }
  submit() {
    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('message', this.form.get('message')?.value);
  
    if (this.data.adminId) {
      formData.append('adminId', this.form.get('adminId')?.value);
    }
    if (this.data.zoneId) {
      formData.append('zoneId', this.form.get('zoneId')?.value);
    }
    if (this.data.rangeId) {
      formData.append('rangeId', this.form.get('rangeId')?.value);
    }
    if (this.data.districtId) {
      formData.append('districtId', this.form.get('districtId')?.value);
    }
    if (this.data.subDivisionId) {
      formData.append('subDivisionId', this.form.get('subDivisionId')?.value);
    }
    if (this.data.policeStationId) {
      formData.append('policeStationId', this.form.get('policeStationId')?.value);
    }
    for (let i = 0; i < this.selectedFiles.length; i++) {
      if (this.selectedFiles[i]) {
        formData.append('files', this.selectedFiles[i]);
      }
    }
  
    this.masterService.addBroadCast(formData).subscribe(
      (data: any) => {
        if (data) {
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/lot/broadCast`);
        }
      },
      (error: any) => {
      }
    );
  }
  

  onFileSelected(event: any, cardIndex: number) {
    const file = event.target.files[0];
    this.selectedFiles[cardIndex] = file;
    console.log(`File selected for card ${cardIndex}: ${file.name}`);
  }

}
