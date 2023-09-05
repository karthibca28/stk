import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnInit {
  public formData!: JsonFormData;
  form!: FormGroup;
  fHeader: string;
  editMasterId: number = 0;
  loading = false;
  stateList:any
  adminList:any

  constructor(private formService: FormService, private router: Router,private formBuilder: FormBuilder, private route: ActivatedRoute,
    private masterService:MasterService, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.editMasterId = this.route.snapshot.params['zoneId'];
     console.log(this.editMasterId)
      // this.editMasterId = this.activatedRoute.snapshot.params['zoneId'];
      // if (this.editMasterId > 0) {
      //   this.editMasterForm();
      // } else {
      //   this.buildMasterForm();
      // }
     

      this.form = this.formBuilder.group({
        code: [''],
        name: ['', Validators.required],
        adminId:['',Validators.required],
        stateId:[''],
        description: ['']
      });
       const id=this.editMasterId
    this.masterService.getZonebyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        adminId:resp.data.administration.id,
        stateId: resp.data.stateId,
        description: resp.data.description,

      });
      console.log(resp.data)
    });
      
      this.getStateList()
      this.getAdminList()
  }
  // buildMasterForm() {
  //   const data = { formKey: 'master-zone' };
  //   // console.log("This is create-",this.editMasterId);
  //   this.formService.getDynamicFormData(data).subscribe((resp: APIResponse) => {
  //     this.formData = resp.data;
  //     this.fHeader = this.formData.formHeader;
  //    // console.log(resp, 'resp');
  //   });
  // }
  // editMasterForm() {
  //   const dataKey = { formKey: 'master-zone', editId: this.editMasterId };
  //   // console.log("This is edit-",this.editMasterId);
  //   this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
  //     // console.log(resp);
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

  submit(formValue: any) {

    if (this.form.valid) {
      this.loading = true;
      this.masterService.addZone(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/zone-list`);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
    // if (this.editMasterId > 0) {
    //   //console.log("ACtiive route id", this.editMasterId);
    //   formValue.editId = this.editMasterId;
    //   this.formService.saveMasterEditForm(formValue).subscribe((resp: APIResponse) => {
    //     if (resp.statusCode == 200) {
    //       //this.editMasterId = resp.data.Id;
    //       this.sharedService.showSuccess(resp.message);
    //       setTimeout(() => {
    //         this.router.navigate(['main/master/zone-list']);
    //       }, 600);
    //     } else {
    //       this.sharedService.showSuccess(resp.message);
    //     }
    //   }, (err: Error) => {
    //     this.sharedService.showError('Problem occurred, Please try again');
    //   })
    // } else {
    //   this.formService.saveMasterForm(formValue).subscribe((resp: APIResponse) => {
    //     if (resp.statusCode == 200) {
    //       this.sharedService.showSuccess(resp.message);
    //       setTimeout(() => {
    //         this.router.navigate(['main/master/zone-list']);
    //       }, 800);
    //     } else {
    //       this.sharedService.showSuccess(resp.message);
    //     }
    //   }, (err: Error) => {
    //     this.sharedService.showError('Problem occurred, Please try again');
    //   })
    // }
  }
  cancel() {
    this.router.navigate(['main/master/zone-list'])
  }

}
