import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnInit {
  public formData!: JsonFormData;
  fHeader: string;
  editMasterId: number = 0;

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
      this.editMasterId = this.activatedRoute.snapshot.params['zoneId'];
      if (this.editMasterId > 0) {
        this.editMasterForm();
      } else {
        this.buildMasterForm();
      }
  }
  buildMasterForm() {
    const data = { formKey: 'master-zone' };
    // console.log("This is create-",this.editMasterId);
    this.formService.getDynamicFormData(data).subscribe((resp: APIResponse) => {
      this.formData = resp.data;
      this.fHeader = this.formData.formHeader;
     // console.log(resp, 'resp');
    });
  }
  editMasterForm() {
    const dataKey = { formKey: 'master-zone', editId: this.editMasterId };
    // console.log("This is edit-",this.editMasterId);
    this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
      // console.log(resp);
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
            this.router.navigate(['main/master/zone-list']);
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
            this.router.navigate(['main/master/zone-list']);
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
    this.router.navigate(['main/master/zone-list'])
  }

}
