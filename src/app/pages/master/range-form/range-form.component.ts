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
  selector: 'app-range-form',
  templateUrl: './range-form.component.html',
  styleUrls: ['./range-form.component.scss']
})
export class RangeFormComponent implements OnInit {
  public formData!: JsonFormData;
  form!: FormGroup;
  fHeader: any;
  editMasterId: any;
  loading = false;
  stateList:any
  zoneList:any
  adminList:any

  constructor(private formService: FormService, private router: Router,private formBuilder: FormBuilder, private route: ActivatedRoute,
     private sharedService: SharedService, private actRouter: ActivatedRoute,private masterService:MasterService,
     private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['rangeId'];
    console.log(this.editMasterId)
    // this.editMasterId = this.actRouter.snapshot.params['rangeId'];
    // console.log("actroiut:",this.editMasterId)
    // if(this.editMasterId > 0){
    //   this.editMasterForm();
    // }else{
    //   this.buildMasterForm();
    // }
    this.form = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      adminId:['',Validators.required],
      zoneId:['',Validators.required],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getRangebyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        adminId:resp.data.administration.id,
        description: resp.data.description,
        zoneId:resp.data.zone.id

      });
      console.log(resp.data)
    });
    this.getZoneList()
    this.getAdminList()
  }
  // buildMasterForm() {
  //   const data = { formKey: 'master-range' };
  //   this.formService.getDynamicFormData(data).subscribe((formData: any) => {
  //     this.formData = formData.data;
  //     this.fHeader = this.formData.formHeader;
  //   });
  // }
  
  // editMasterForm() {
  //   const dataKey = { formKey: 'master-range', editId: this.editMasterId };
  //   this.formService.updateMasterForm(dataKey).subscribe((resp: APIResponse) => {
  //     console.log(resp);
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
 
  submit() {
    if (this.editMasterId === 0 || this.editMasterId === undefined || this.editMasterId === null) {
      this.addRecord();
    } else {
      this.updateRecord();
    }
  }

  addRecord() {
    this.loadingService.showLoader();
      this.loadingService.hideLoader();
    if (this.form.valid) {
      this.loading = true;
      this.masterService.addRange(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/range-list`);
    this.loadingService.hideLoader();
        }
      });
    } else {
      this.form.markAllAsTouched();
    this.loadingService.hideLoader();
    }
    this.loadingService.hideLoader();
  }
  updateRecord(){   
     this.loadingService.showLoader();
    if (this.form.valid) {
      this.loading = true;
      let value = {
        id:this.editMasterId,
        code:this.form.value.code,
        name:this.form.value.name,
        adminId:this.form.value.adminId,
        zoneId:this.form.value.zoneId,
        description:this.form.value.description, 
      }
      // const updatedData = this.form.value;
      this.masterService.updateRange(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/range-list`);
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
    this.router.navigate(['main/master/range-list'])
  }
  filterSpecialCharacters(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }
}
