import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.scss']
})
export class RoleFormComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  editMasterId:any
  stateList:any
  constructor(private router: Router, private formBuilder: FormBuilder, private loadingService: LoadingService,
    private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['roleId'];
    console.log("datasss",this.editMasterId)
    this.form = this.formBuilder.group({
      roleCode:['',Validators.required],
      name: ['', Validators.required],
      description:[''],

    });
    const id=this.editMasterId
    this.masterService.getRolebyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        roleCode: resp.data[0]?.roleCode,
        name: resp.data[0]?.roleName,
        description: resp.data[0]?.description,
      });
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
      this.masterService.addRole(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/user-config/role-list`);
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
        roleCode:this.form.value.roleCode,
        name:this.form.value.name,
        description:this.form.value.description,
      }
      // const updatedData = this.form.value;
      this.masterService.updateRole(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/user-config/role-list`);
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
    this.router.navigate(['main/user-config/role-list'])
  }
  filterSpecialCharacters(event: any): void {
    const input = event.target as HTMLInputElement;
    input.value = input.value.replace(/[^a-zA-Z0-9]/g, '');
  }
}
