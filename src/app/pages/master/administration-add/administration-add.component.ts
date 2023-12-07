import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-administration-add',
  templateUrl: './administration-add.component.html',
  styleUrls: ['./administration-add.component.scss']
})
export class AdministrationAddComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitting = false;
  submitted = false;
  editMasterId:any
  stateList:any
  constructor(private router: Router, private formBuilder: FormBuilder, 
    private route: ActivatedRoute,private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.editMasterId = this.route.snapshot.params['adminId'];
    this.form = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      stateId:[''],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getAdmistrationbyId(id).subscribe((resp:any) => {
      // const stateData = {
      //   id: resp.data.state.id,
      //   name: resp.data.state.name
      // };
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        stateId: resp.data.state.id,
        description: resp.data.description,
      });
      // this.stateList = [stateData]
    });
    this.getStateList()
  }
  
  getStateList() {
    this.masterService.stateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }

  onSubmit() {
    if (this.editMasterId === 0 || this.editMasterId === undefined || this.editMasterId === null) {
      this.addRecord();
    } else {
      this.updateRecord();
    }
  }
  
  
  
  addRecord() {
    if (this.form.valid) {
      this.loading = true;
      this.masterService.administration(this.form.value).subscribe((data: any) => {
        if (data) {
          this.loading = false;
          this.sharedService.showSuccess('Added successfully!');
          this.form.reset();
          this.router.navigateByUrl(`main/master/administration`);
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
  cancel() {
    this.router.navigate(['main/master/administration'])
  }
  
}
  
