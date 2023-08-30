import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-add-new-location',
  templateUrl: './add-new-location.component.html',
  styleUrls: ['./add-new-location.component.scss']
})
export class AddNewLocationComponent implements OnInit {
  public formData!: JsonFormData;
  editMasterId: any;

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private actRouter: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.editMasterId = this.actRouter.snapshot.params['locId'];
    // console.log("Data id edit form", this.editMasterId);
    if(this.editMasterId > 0){
      this.editMasterForm();
    }else{
      this.buildMasterForm();
    }
  }
  buildMasterForm() {
    const data = { formKey: 'location' };
    this.formService.getDynamicFormData(data).subscribe((resp: any) => {
      this.formData = resp.data;
    });
  }
  editMasterForm() {
    const dataKey = { formKey: 'location', editId: this.editMasterId };
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
            this.router.navigate(['main/approve-location']);
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
            this.router.navigate(['main/view-approve-location']);
          }, 800);
        } else {
          this.sharedService.showSuccess(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    }
  }
  backClick() {
    this.router.navigate(['main/'])
  }
}
