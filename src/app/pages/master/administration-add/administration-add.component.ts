import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private router: Router, private formBuilder: FormBuilder, private masterService: MasterService, private sharedService:SharedService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: [''],
      name: ['', Validators.required],
      description: ['']
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
