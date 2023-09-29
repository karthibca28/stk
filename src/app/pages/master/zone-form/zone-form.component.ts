import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';
@Component({
  selector: 'app-zone-form',
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnInit {
  public formData!: JsonFormData;
  form!: FormGroup;
  fHeader: string;
  editMasterId: number = 0;
  loading = false;
  stateList:any
  adminList:any

  constructor(private formService: FormService, private router: Router,private formBuilder: FormBuilder, private route: ActivatedRoute,
    private masterService:MasterService, private sharedService: SharedService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
     this.editMasterId = this.route.snapshot.params['zoneId'];
     console.log(this.editMasterId)    

      this.form = this.formBuilder.group({
        code: [''],
        name: ['', Validators.required],
        adminId:['',Validators.required],
        description: ['']
      });
       const id=this.editMasterId
    this.masterService.getZonebyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        adminId:resp.data.administration.id,
        description: resp.data.description,

      });
      console.log(resp.data)
    });
      
      this.getStateList()
      this.getAdminList()
  }
  getAdminList() {
    this.masterService.adminList().subscribe((resp: any) => {
       this.adminList = resp.data
    });
  }

    getStateList() {
    this.masterService.stateList().subscribe((resp: any) => {
       this.stateList = resp.data 
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
      this.masterService.addZone(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/zone-list`);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }
  updateRecord(){
    if (this.form.valid) {
      this.loading = true;
      let value = {
        id:this.editMasterId,
        code:this.form.value.code,
        name:this.form.value.name,
        adminId:this.form.value.adminId,
        description:this.form.value.description, 
      }
      // const updatedData = this.form.value;
      this.masterService.updateZone(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/zone-list`);
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
    this.router.navigate(['main/master/zone-list'])
  }

}
