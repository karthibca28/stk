import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-police-station-form',
  templateUrl: './police-station-form.component.html',
  styleUrls: ['./police-station-form.component.scss']
})
export class PoliceStationFormComponent implements OnInit {
  public formData!: JsonFormData;
  fHeader: any;
  editMasterId: any;
  form!: FormGroup;
  loading = false;
  zoneList:any
  rangeList:any
  districtList:any
  subDivisionList:any
  adminList:any
  constructor(private formService: FormService, private router: Router,private masterService:MasterService,private route: ActivatedRoute,
    private formBuilder: FormBuilder, private sharedService: SharedService, private actRouter: ActivatedRoute) { }

  ngOnInit(): void {
        this.editMasterId = this.route.snapshot.params['policeStationId'];
    console.log(this.editMasterId)
    // this.editMasterId = this.actRouter.snapshot.params['pstatId'];
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
      districtId:['',Validators.required],
      subDivisionId:['',Validators.required],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getPoliceStationbyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        adminId:resp.data.administration.id,
        stateId: resp.data.stateId,
        rangeId:resp.data.range.id,
        description: resp.data.description,
        zoneId:resp.data.zone.id,
        subDivisionId:resp.data.subDivision.id,
        districtId:resp.data.district.id
      });
      console.log(resp.data)
    });
    this.getZoneList()
    this.getRangeList()
    this.getDistrictList()
    this.getSubDivision()
    this.getAdminList()
  }
  // buildMasterForm() {
  //   const data = { formKey: 'master-police-station' };
  //   this.formService.getDynamicFormData(data).subscribe((formData: any) => {
  //     this.formData = formData.data;
  //     this.fHeader = this.formData.formHeader;
  //   });
  // }
  // editMasterForm() {
  //   const dataKey = { formKey: 'master-police-station', editId: this.editMasterId };
  //   console.log(dataKey);
  //   this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
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
  getSubDivision() {
    this.masterService.subDivision().subscribe((resp: any) => {
       this.subDivisionList = resp.data
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

    if (this.form.valid) {
      this.loading = true;
      this.masterService.addPoliceStation(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/police-station-list`);
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
        districtId:this.form.value.districtId,
        subDivisionId:this.form.value.subdivisionId
      }
      this.masterService.updatePoliceStation(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/police-station-list`);
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  
  // submit(formValue: any) {
  //   if (this.editMasterId > 0) {
  //     formValue.editId = this.editMasterId;
  //     this.formService.saveMasterEditForm(formValue).subscribe((resp: APIResponse) => {
  //       if (resp.statusCode == 200) {
  //         //this.editMasterId = resp.data.Id;
  //         this.sharedService.showSuccess(resp.message);
  //         setTimeout(() => {
  //           this.router.navigate(['main/master/police-station-list']);
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
  //           this.router.navigate(['main/master/police-station-list']);
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
    this.router.navigate(['main/master/police-station-list'])
  }

}
