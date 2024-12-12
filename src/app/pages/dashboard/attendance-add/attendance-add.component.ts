import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.scss']
})
export class AttendanceAddComponent implements OnInit {
  attendanceForm!: FormGroup;
  attHistory: any;
  userID: any;

  constructor(private fb: FormBuilder, private masterService: MasterService, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userID = JSON.parse(sessionStorage.getItem('userInfo') as string);
    console.log("User data", this.userID);
    this.attendanceForm = this.fb.group({
      toggle: [false],
      remark: ['', Validators.required],
      latitude: [{ value: '', disabled: true }],
      longitude: [{ value: '', disabled: true }],
    });
    this.masterService.attendanceHistory().subscribe((resp: any) => {
      this.attHistory = resp;
      console.log("Data", resp)
    });
    // const userId = 'clofbsfgu00059a09qjimow6h';
    // this.masterService.getAttendanceById(userId).subscribe((resp: any) => {
    //   this.attHistory = resp;
    //   console.log("Data", resp)
    // });

    this.getCurrentLocation();
  }

  // createAttendance() {
  //   const data = {
  //     "remark":"testing",
  //     "latitude":"10.09",
  //     "longitude":"58.09",
  //     "userId": this.userID.id
  //   };
  //   this.masterService.attendanceInout(data).subscribe((resp: any) => {
  //     this.attHistory = resp;
  //     console.log("Data", resp)
  //   });
  // }

  getCurrentLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.attendanceForm.patchValue({
            latitude: position.coords.latitude.toFixed(5),
            longitude: position.coords.longitude.toFixed(5),
          });
        },
        (error) => {
           this.sharedService.showError("Unable to fetch location.");
          // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Unable to fetch location.' });
        }
      );
    } else {
      this.sharedService.showError("Geolocation is not supported by this browser.");
      // this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Geolocation is not supported by this browser.' });
    }
  }

  onSubmit(): void {
    if (this.attendanceForm.valid) {
      const postData = {
        // toggle: this.attendanceForm.value.toggle ? 'IN' : 'OUT',
        remark: this.attendanceForm.value.remark,
        latitude: this.attendanceForm.get('latitude')?.value,
        longitude: this.attendanceForm.get('longitude')?.value,
        userId: this.userID.data.userData.id,
      };
      // console.log("post data", postData)

      this.masterService.attendanceInout(postData).subscribe({
        next: (response) => {
          this.sharedService.showSuccess("Attendance submitted successfully!");
        },
        error: (err) => {
          this.sharedService.showError("Submission failed.");
        },
      });
    }
  }

}
