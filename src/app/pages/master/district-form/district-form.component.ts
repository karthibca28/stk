import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
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
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
      // this.sharedService.getDynamicFormData().subscribe((formData: any) => {
      //   this.formData = formData.district;
      // });
    this.editMasterId = this.actRouter.snapshot.params['distId'];
    if(this.editMasterId > 0){
      this.editMasterForm();
    }else{
      this.buildMasterForm();
    }
  }
  buildMasterForm() {
    const data = { formKey: 'master-district' };
    this.formService.getDynamicFormData(data).subscribe((formData: any) => {
      this.formData = formData.data;
      this.fHeader = this.formData.formHeader;
    });
  }
  editMasterForm() {
    const dataKey = { formKey: 'master-district', editId: this.editMasterId };
    this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
      //console.log("Edit form", resp.data.controls);
      if (resp.statusCode == '200') {
        this.formData = resp.data;
      }
    })
  }
  submit(formValue: any) {
    if (this.editMasterId > 0) {
      //console.log("ACtiive route id", this.editMasterId);
      formValue.editId = this.editMasterId;
      this.formService.saveMasterEditForm(formValue).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
          //this.editMasterId = resp.data.Id;
          this.sharedService.showSuccess(resp.message);
          setTimeout(() => {
            this.router.navigate(['main/master/district-list']);
          }, 600);
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
            this.router.navigate(['main/master/district-list']);
          }, 800);
        } else {
          this.sharedService.showSuccess(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    }
  }
  cancel() {
    this.router.navigate(['main/master/district-list'])
  }

}
