import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-district-form',
  templateUrl: './district-form.component.html',
  styleUrls: ['./district-form.component.scss']
})
export class DistrictFormComponent implements OnInit {
  public formData!: JsonFormData;
  fHeader: any;
  editMasterId: any;
  form!: FormGroup;
  loading = false;
  stateList:any
  zoneList:any
  rangeList:any
  adminList:any
  constructor(private formService: FormService, private router: Router,private masterService:MasterService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private sharedService: SharedService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['districtId'];
    console.log(this.editMasterId)
      // this.sharedService.getDynamicFormData().subscribe((formData: any) => {
      //   this.formData = formData.district;
      // });
    // this.editMasterId = this.actRouter.snapshot.params['distId'];
    // if(this.editMasterId > 0){
    //   this.editMasterForm();
    // }else{
    //   this.buildMasterForm();
    // }

    this.form = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      adminId:['',Validators.required],
      stateId:[''],
      zoneId:['',Validators.required],
      rangeId:['',Validators.required],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getDistrictbyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        adminId:resp.data.administration.id,
        stateId: resp.data.stateId,
        description: resp.data.description,
        zoneId:resp.data.zone.id,
        rangeId:resp.data.range.id

      });
      console.log(resp.data)
    });
    this.getStateList()
    this.getZoneList()
    this.getRangeList()
    this.getAdminList()
  }
  // buildMasterForm() {
  //   const data = { formKey: 'master-district' };
  //   this.formService.getDynamicFormData(data).subscribe((formData: any) => {
  //     this.formData = formData.data;
  //     this.fHeader = this.formData.formHeader;
  //   });
  // }
  // editMasterForm() {
  //   const dataKey = { formKey: 'master-district', editId: this.editMasterId };
  //   this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
  //     //console.log("Edit form", resp.data.controls);
  //     if (resp.statusCode == '200') {
  //       this.formData = resp.data;
  //     }
  //   })
  // }
  getAdminList() {
    this.masterService.adminList().subscribe((resp: any) => {
       this.adminList = resp.data

    });
  }

  getStateList() {
    this.masterService.stateList().subscribe((resp: any) => {
       this.stateList = resp.data
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
  submit(formValue: any) {

    if (this.form.valid) {
      this.loading = true;
      this.masterService.addDistrict(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/district-list`);
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
  //         //this.editMasterId = resp.data.Id;
  //         this.sharedService.showSuccess(resp.message);
  //         setTimeout(() => {
  //           this.router.navigate(['main/master/district-list']);
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
  //           this.router.navigate(['main/master/district-list']);
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
    this.router.navigate(['main/master/district-list'])
  }

}
