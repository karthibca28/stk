import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-rank-form',
  templateUrl: './rank-form.component.html',
  styleUrls: ['./rank-form.component.scss']
})
export class RankFormComponent implements OnInit {  
  form!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  editMasterId:any
  roleList:any
  accessControlList:any
  constructor(private router: Router, private formBuilder: FormBuilder, 
    private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['rankId'];
    console.log(this.editMasterId)
    this.form = this.formBuilder.group({
      rankCode:[''],
      name: ['', Validators.required],
      accessId:[''],
      roleId:[''],
      description:[''],

    });
    this.getRole();
    this.getAccessControl();
    const id=this.editMasterId
    this.masterService.getRankbyId(id).subscribe((resp:any) => {
      console.log(resp.data[0].role)
      this.form.patchValue({
        rankCode: resp.data[0].rankCode,
        name: resp.data[0].rankName,
        accessId: resp.data[0].access.id,
        roleId: resp.data[0].role.id,
        description: resp.data[0].description,
      });
    });
  }

  getRole() {
    this.masterService.roleList().subscribe((formData: any) => {
      this.roleList=formData.data
      console.log(this.roleList)
    });
  }
  getAccessControl() {
    this.masterService.accessControlList().subscribe((formData: any) => {
       this.accessControlList=formData.data 
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
      this.masterService.addRank(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/rank-list`);
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
        rankCode:this.form.value.rankCode,
        name:this.form.value.name,
        accessId:this.form.value.accessId, 
        roleId:this.form.value.roleId,
        description:this.form.value.description

      }
      // const updatedData = this.form.value;
      this.masterService.updateRank(value).subscribe(
        (data: any) => {
          this.loading = false;
          this.sharedService.showSuccess('Updated successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/rank-list`);
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
