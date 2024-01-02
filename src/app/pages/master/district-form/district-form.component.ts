import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
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
  zoneList:any
  rangeList:any
  adminList:any
  constructor(private formService: FormService, private router: Router,private masterService:MasterService, private route: ActivatedRoute,
    private formBuilder: FormBuilder, private sharedService: SharedService, private actRouter: ActivatedRoute,private loadingService: LoadingService) { }

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
        // stateId: resp.data.state,
        description: resp.data.description,
        zoneId:resp.data.zone.id,
        rangeId:resp.data.range.id

      });
      console.log(resp.data)
    });
    this.getZoneList();
    this.getRangeList();
    this.getAdminList();
  }

  getAdminList() {
    this.masterService.adminList().subscribe((resp: any) => {
       this.adminList = resp.data

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
      this.masterService.addDistrict(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/district-list`);
      this.loadingService.hideLoader();
        }
      });
    } else {
      this.form.markAllAsTouched();
      this.loadingService.hideLoader();
    }
    this.loadingService.hideLoader();
  }
  updateRecord() {
    this.loadingService.showLoader();
    if (this.form.valid) {
      this.loading = true;
      let value = {
        id :this.editMasterId,
        code:this.form.value.code,
        name:this.form.value.name,
        description:this.form.value.description, 
        adminId:this.form.value.adminId,
        zoneId:this.form.value.zoneId,
        rangeId:this.form.value.rangeId
      }
      this.masterService.updateDistrict(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/district-list`);
      this.loadingService.hideLoader();

        },
        (error) => {
          console.error('Error updating record:', error);
      this.loadingService.hideLoader();

        }
      );
    } else {
      this.form.markAllAsTouched();
      this.loadingService.hideLoader();
    }
  }
  cancel() {
    this.router.navigate(['main/master/district-list'])
  }
  filterSpecialCharacters(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }
}
