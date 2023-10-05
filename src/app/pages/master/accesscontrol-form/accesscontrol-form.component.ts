import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  stateList:any
  constructor(private router: Router, private formBuilder: FormBuilder, 
    private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['accessControlId'];
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
      console.log(resp.data[0].name)
      this.form.patchValue({
        name: resp.data[0].name,
        description: resp.data[0].description,
        isCustom: resp.data[0].isCustom,
        stateAccess: resp.data[0].stateAccess,
        admAccess: resp.data[0].admAccess,
        zoneAccess: resp.data[0].zoneAccess,
        rangeAccess: resp.data[0].rangeAccess,
        districtAccess: resp.data[0].districtAccess,
        subDivAccess: resp.data[0].subDivAccess,
        psAccess: resp.data[0].psAccess,
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
    if (this.form.valid) {
      this.loading = true;
      this.masterService.accessControl(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/accesscontrol-list`);
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
        stateId:this.form.value.stateId
      }
      // const updatedData = this.form.value;
      this.masterService.updateAdminstration(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/administration`);
        },
        (error) => {
          console.error('Error updating record:', error);
        }
      );
    } else {
      this.form.markAllAsTouched();
    }
  }
  
}
