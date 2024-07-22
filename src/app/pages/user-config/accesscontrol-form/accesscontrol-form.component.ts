import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-accesscontrol-form',
  templateUrl: './accesscontrol-form.component.html',
  styleUrls: ['./accesscontrol-form.component.scss']
})
export class AccesscontrolFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  editMasterId:any
  stateList:any;
  isEditMode = false;
  constructor(private router: Router, private formBuilder: FormBuilder, private loadingService: LoadingService,
    private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['accessControlId'];
    this.isEditMode = !!this.editMasterId;
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description:[''],
      isCustom: [false],
      stateAccess: [false],
      admAccess: [false],
      zoneAccess: [false],
      rangeAccess: [false],
      districtAccess: [false],
      subDivAccess: [false],
      psAccess: [false],

    });
    const id=this.editMasterId
    this.masterService.getAccessControlbyId(id).subscribe((resp:any) => {
      console.log("datas",resp.data[0]?.name)
      this.form.patchValue({
        name: resp.data[0]?.name,
        description: resp.data[0]?.description,
        isCustom: resp.data[0]?.isCustom,
        stateAccess: resp.data[0]?.stateAccess,
        admAccess: resp.data[0]?.admAccess,
        zoneAccess: resp.data[0]?.zoneAccess,
        rangeAccess: resp.data[0]?.rangeAccess,
        districtAccess: resp.data[0]?.districtAccess,
        subDivAccess: resp.data[0]?.subDivAccess,
        psAccess: resp.data[0]?.psAccess,
      });
      // this.stateList = [stateData]
    });
  }
  

  submit() {
    if (this.editMasterId === 0 || this.editMasterId === undefined || this.editMasterId === null) {
      this.addRecord();
    } else {
      this.updateRecord();
    }
  }
  
  addRecord() {
    this.loadingService.showLoader();
    if (this.form.valid) {
      this.loading = true;
      this.masterService.accessControl(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/user-config/accesscontrol-list`);
          this.loadingService.hideLoader();
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.loadingService.hideLoader();
    }
  }
  
  updateRecord() {
    if (this.form.valid) {
      this.loading = true;
      let value = {
        id :this.editMasterId,
        description:this.form.value.description,
        isCustom: this.form.value.isCustom,
        stateAccess: this.form.value.stateAccess,
        admAccess: this.form.value.admAccess,
        zoneAccess: this.form.value.zoneAccess,
        rangeAccess: this.form.value.rangeAccess,
        districtAccess: this.form.value.districtAccess,
        subDivAccess: this.form.value.subDivAccess,
        psAccess: this.form.value.psAccess,
      }
      // const updatedData = this.form.value;
      this.masterService.updateAccessControl(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/user-config/accesscontrol-list`);
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
  cancel() {
    this.router.navigate(['main/user-config/accesscontrol-list'])
  }
}
