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
        title: ['',Validators.required],
        message: ['',Validators.required],
        // stateId:[''],
        adminId:['',Validators.required],
        zoneId:['',Validators.required],
        rangeId:['',Validators.required],
        districtId:['',Validators.required],
        subDivisionId:['',Validators.required],
        policeStationId:['',Validators.required],
        files:['']
      });
    // this.getZoneList()
    // this.getRangeList()
    // this.getDistrictList()
    // this.getSubDivision()
    // this.getAdminList()
    // this.getStateList()
    // this.getPoliceStaion()
    this.getAccessControl()
  }

  getStateList() {
    this.masterService.commonStateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }

  getAdminList(id:any) {
    this.masterService.commonAdminList(id).subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }


  getZoneList(id:any) {
    this.masterService.commonZone(id).subscribe((resp: any) => {
       this.zoneList = resp.data
       this.zoneList.unshift({id: 'all', name: 'All'})
    });
  }

  getRangeList(id:any) {
    this.masterService.commonRange(id).subscribe((resp: any) => {
       this.rangeList = resp.data
       this.rangeList.unshift({id: 'all', name: 'All'})
    });
  }
   getDistrictList(id:any) {
    this.masterService.commonDistrict(id).subscribe((resp: any) => {
       this.districtList = resp.data
       this.districtList.unshift({id: 'all', name: 'All'})
    });
  }
  getSubDivision(id:any) {
    this.masterService.commonSubDivision(id).subscribe((resp: any) => {
       this.subDivisionList = resp.data
       this.subDivisionList.unshift({id: 'all', name: 'All'})
    });
  }
  getPoliceStaion(id:any) {
    this.masterService.commonPoliceStation(id).subscribe((resp: any) => {
       this.policeStationList = resp.data
       this.policeStationList.unshift({id: 'all', name: 'All'})
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data;
      console.log(this.data)
      if(this.data.zoneId === true){
      this.getZoneList(resp.data.inputId)
      }
      if(this.data.rangeId === true){
      this.getRangeList(resp.data.inputId)
    }
      if(this.data.districtId === true){
      this.getDistrictList(resp.data.inputId)
      }
      if(this.data.subDivisionId === true){
      this.getSubDivision(resp.data.inputId)
      }
      if(this.data.adminId === true){
      this.getAdminList(resp.data.inputId)
      }
      // if(this.data.stateId === true){
      // this.getStateList()
      // }
      if(this.data.policeStationId === true){
      this.getPoliceStaion(resp.data.inputId)
      }
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
  cancel() {
    this.router.navigate(['main/lot/broadCast'])
  }

}
