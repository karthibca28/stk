import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Console } from 'console';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  public formData!: JsonFormData;
  form!: FormGroup;
  editMasterId: any;
  loading = false;
  stateList:any
  rankList:any
  zoneList:any
  rangeList:any
  roleList:any
  districtList:any
  subDivisionList:any
  adminList:any
  policeStationList:any
  userData:any
  constructor(private formService: FormService, private router: Router,private masterService:MasterService, private formBuilder: FormBuilder,
     private sharedService: SharedService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    // this.editMasterId = this.actRouter.snapshot.params['userId'];
    // if(this.editMasterId > 0){
    //   this.editMasterForm();
    // }else{
    //   this.buildMasterForm();
    // }
    this.form = this.formBuilder.group({
      firstName: ['',Validators.required],
      middleName: [''],
      lastName:[''],
      gpfCpsNo:['',Validators.required],
      address:[''],
      phone:[''],
      email:[''],
      userName:['',Validators.required],
      password:['',Validators.required],
      pinHash:[''],
      roleId:['',Validators.required],
      rankName:['',Validators.required],
      adminId:['',Validators.required],
      stateId:[''],
      zoneId:['',Validators.required],
      rangeId:['',Validators.required],
      districtId:['',Validators.required],
      subDivisionId:['',Validators.required],
      policeStationId: ['',Validators.required]
    });
    this.getRoleList()
    this.getRankList()
    this.getStateList()
    //this.getZoneList()
    //this.getRangeList()
    //this.getDistrictList()
    //this.getSubDivision()
    // this.getAdminList()
    //this.getPoliceStationList()
  }

getRoleList(){
  this.masterService.roleList().subscribe((resp: any) =>{
    this.roleList = resp.data
  })
}

  getPoliceStationList(subDivisionId:any) {
    this.masterService.getPoliceStationUser(subDivisionId).subscribe((resp: any) => {
    this.policeStationList = resp.data
    });
  }

  getAdminList(stateId:any) {
    this.masterService.adminListUser(stateId).subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }

  getStateList() {
    this.masterService.stateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }
  getRankList(){
    this.masterService.rankList().subscribe((resp: any) =>{
      this.rankList = resp.data
      console.log("da",resp.data)
    })
  }

  getZoneList(adminId:any) {
    this.masterService.getZoneUser(adminId).subscribe((resp: any) => {
       this.zoneList = resp.data
    });
  }

  getRangeList(zoneId:any) {
    this.masterService.getRangeUser(zoneId).subscribe((resp: any) => {
       this.rangeList = resp.data
    });
  }
   getDistrictList(rangeId:any) {
    this.masterService.getDistrictUser(rangeId).subscribe((resp: any) => {
       this.districtList = resp.data
    });
  }
  getSubDivision(districtId:any) {
    this.masterService.getSubDivisionUser(districtId).subscribe((resp: any) => {
       this.subDivisionList = resp.data
    });
  }
  buildMasterForm() {
    const data = { formKey: 'user' };
    this.formService.getDynamicFormData(data).subscribe((resp: any) => {
      this.formData = resp.data;
      //console.log("form user",this.formData);
      
    });
  }
  editMasterForm() {
    const dataKey = { formKey: 'user', editId: this.editMasterId };
    this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
      //console.log("Edit form", resp.data.controls);
      if (resp.statusCode == '200') {
        this.formData = resp.data;
        console.log("data", this.formData)
      }
    })
  }
  submit(formValue: any) {

    if (this.form.valid) {
      this.loading = true;
      this.masterService.UserRegistration(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/user-config/user-list`);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  
  // submit(formValue: any) {
  //   if (this.editMasterId > 0) {
  //     //console.log("ACtiive route id", this.editMasterId);
  //     formValue.editId = this.editMasterId;
  //     this.formService.saveMasterEditForm(formValue).subscribe((resp: APIResponse) => {
  //       if (resp.statusCode == 200) {
  //         this.sharedService.showSuccess(resp.message);
  //         setTimeout(() => {
  //           this.router.navigate(['main/user-config/user-list']);
  //         }, 600);
  //       } else {
  //         this.sharedService.showSuccess(resp.message);
  //       }
  //     }, (err: Error) => {
  //       this.sharedService.showError('Problem occurred, Please try again');
  //     })
  //   } else {
  //     this.formService.saveMasterForm(formValue).subscribe((resp: APIResponse) => {
  //       if (resp.statusCode == 200) {
  //         this.sharedService.showSuccess(resp.message);
  //         setTimeout(() => {
  //           this.router.navigate(['main/user-config/user-list']);
  //         }, 800);
  //       } else {
  //         this.sharedService.showSuccess(resp.message);
  //       }
  //     }, (err: Error) => {
  //       this.sharedService.showError('Problem occurred, Please try again');
  //     })
  //   }
  // }
  cancel() {
    this.router.navigate(['main/user-config/user-list'])
  }
}
