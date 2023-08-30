import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-vehicle-blacklist',
  templateUrl: './add-vehicle-blacklist.component.html',
  styleUrls: ['./add-vehicle-blacklist.component.scss']
})
export class AddVehicleBlacklistComponent implements OnInit {
  public formData!: JsonFormData;
  pv: boolean;
  editMasterId: any;
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  issofficer: boolean = false;
  isSHO: boolean = false;
  userData: any;

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.roleId === 1) {
      this.isAdmin = true;
    } else if(this.userData.data.roleId === 2) {
      this.isDAdmin = true;
    } else if(this.userData.data.roleId === 3) {
      this.issofficer = true;
    } else if(this.userData.data.roleId === 4) {
      this.isSHO = true;
    } 
    this.editMasterId = this.actRouter.snapshot.params['vehicleBId'];
    //console.log("Data id edit form", this.editMasterId);
    if(this.editMasterId > 0){
      this.editMasterForm();
    }else{
      this.buildMasterForm();
    }
  }

  buildMasterForm() {
    const data = { formKey: 'blacklist-vehicle' }
    this.formService.getDynamicFormData(data).subscribe((resp: any) => {
      this.formData = resp.data;
    });
  }
  editMasterForm() {
    const dataKey = { formKey: 'blacklist-vehicle', editId: this.editMasterId };
    this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
      //console.log("Edit form", resp.data.controls);
      if (resp.statusCode == '200') {
        this.formData = resp.data;
      }
    })
  }
  submit(formValue: any) {
    if (this.editMasterId > 0) {
      formValue.editId = this.editMasterId;
      this.formService.saveMasterEditForm(formValue).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
            this.sharedService.showSuccess(resp.message);
          setTimeout(() => {
            this.router.navigate(['main/vehicle-blacklist']);
          }, 800);
        } else {
          this.sharedService.showSuccess(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    } else {
      this.formService.saveMasterForm(formValue).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
            this.sharedService.showSuccess(resp.message);
          setTimeout(() => {
            this.router.navigate(['main/vehicle-blacklist']);
          }, 800);
        } else {
          this.sharedService.showError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    }
  }
  cancel() {
    if (this.isAdmin || this.isDAdmin){
      this.router.navigate(['/main/admin']);
    } else if(this.issofficer){
      this.router.navigate(['/main/so']);
    } else if(this.isSHO){
      this.router.navigate(['/main']);
    }
  }

}
