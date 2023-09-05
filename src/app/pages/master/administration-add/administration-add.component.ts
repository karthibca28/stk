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
    console.log(this.route.snapshot.params['adminId'])
    this.form = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      stateId:[''],
      description: ['']
    });
    const id=this.editMasterId
    this.masterService.getAdmistrationbyId(id).subscribe((resp:any) => {
      this.form.patchValue({
        code: resp.data.code,
        name: resp.data.name,
        stateId: resp.data.stateId,
        description: resp.data.description,

      });
    });
    this.getStateList()
  }
  
  getStateList() {
    this.masterService.stateList().subscribe((resp: any) => {
       this.stateList = resp.data
    });
  }

  onSubmit() {
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
      // if(this.editMasterId > 0){
      //   const name = this.form.value.name;
      //   const districtId = this.editMasterId;
      //   const updateData = { districtId, name }
      //   this.formService.districtUpdate(updateData).subscribe((data: any) => {
      //     if (data) {
      //       this.isNotLoader = true;
      //       this.isLoader = false;
      //       this.sharedService.showSuccess('District updated successfully!');
      //       this.router.navigateByUrl(`main/master/district`);
      //     }
      //   });
      // }else{
      //   this.formService.addDistrict(this.form.value).subscribe((data: any) => {
      //     if (data) {
      //       this.isNotLoader = true;
      //       this.isLoader = false;
      //       this.sharedService.showSuccess('District added successfully!');
      //       this.form.reset();
      //       this.router.navigateByUrl(`main/master/district`);
      //     }
      //   });
      // }
    } else {
      this.form.markAllAsTouched();
    }
  }

}
