import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-sub-division-form',
  templateUrl: './sub-division-form.component.html',
  styleUrls: ['./sub-division-form.component.scss']
})
export class SubDivisionFormComponent implements OnInit {
  public formData!: JsonFormData;
  fHeader: any;
  editMasterId: any;
  form!: FormGroup;
  loading = false;
  stateList:any
  zoneList:any
  rangeList:any
  districtList:any
  adminList:any
  constructor(private formService: FormService, private router: Router,private masterService:MasterService,private route: ActivatedRoute,
    private formBuilder: FormBuilder, private sharedService: SharedService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['subDivisionId'];
    console.log(this.editMasterId)

    this.form = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      adminId:['',Validators.required],
      zoneId:['',Validators.required],
      rangeId:['',Validators.required],
      districtId:['',Validators.required],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getSubDivisionbyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        adminId:resp.data.administration.id,
        rangeId:resp.data.range.id,
        description: resp.data.description,
        zoneId:resp.data.zone.id,
        districtId:resp.data.district.id
      });
      console.log(resp.data)
    });
    this.getZoneList()
    this.getRangeList()
    this.getDistrictList()
    this.getAdminList()
  }
  // buildMasterForm() {
  //   const data = { formKey: 'master-subdivision' };
  //   this.formService.getDynamicFormData(data).subscribe((formData: any) => {
  //     this.formData = formData.data;
  //     this.fHeader = this.formData.formHeader;
  //   });
  // }
  // editMasterForm() {
  //   const dataKey = { formKey: 'master-subdivision', editId: this.editMasterId };
  //   this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
  //     //console.log();
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
   getDistrictList() {
    this.masterService.district().subscribe((resp: any) => {
       this.districtList = resp.data
    });
  }
  submit() {
    if (this.editMasterId === 0) {
      this.addRecord();
    } else {
      this.updateRecord();
    }
  }

  addRecord() {

    if (this.form.valid) {
      this.loading = true;
      this.masterService.addSubDivsion(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/sub-division-list`);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  updateRecord() {
    if (this.form.valid) {
      this.loading = true;
      let value = {
        id :this.editMasterId,
        code:this.form.value.code,
        name:this.form.value.name,
        description:this.form.value.description, 
        adminId:this.form.value.adminId,
        zoneId:this.form.value.zoneId,
        rangeId:this.form.value.rangeId,
        districtId:this.form.value.districtId
      }
      this.masterService.updateSubDivision(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/sub-division-list`);
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
    this.router.navigate(['main/master/sub-division-list'])
  }

}
