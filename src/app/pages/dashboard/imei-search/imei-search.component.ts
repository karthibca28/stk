import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APIResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-imei-search',
  templateUrl: './imei-search.component.html',
  styleUrls: ['./imei-search.component.scss']
})
export class ImeiSearchComponent implements OnInit {

  imeiData: any;
  isData: boolean;
  submitted = false;
  ksLoader: boolean = false;
  empty: boolean = false;
  imeiForm = this.fb.group({imeiNo: ['',Validators.required]});

  constructor(private fb: FormBuilder, private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.submitted = true;
    const imeiNo = this.imeiForm.value.imeiNo;
    //console.log("imei no", imeiNo);
    if (this.imeiForm.valid) {
      const sData = { "imeiNo" : imeiNo};
      this.isData = false;
      this.empty = false;
      this.ksLoader = true;
      this.formService.getImeiData(sData).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
          setTimeout(() => {
            this.ksLoader = false;
            this.isData = true;
            this.imeiData = resp.data;
            //console.log("imei search data", this.imeiData)
            this.sharedService.showSuccess("IMEI Data Fetched Successfully");
          }, 400);
        } else {
          this.ksLoader = false;
          this.empty = true;
          //this.sharedService.showError(resp.message);
        }
      }, (err: Error) => {
        this.sharedService.showError('Problem occurred, Please try again');
      })
    }
  }
  get imeiFormControl() {
    return this.imeiForm.controls;
  }
  // imeiSubmit() {
  //   console.log("imei submit", this.imeiData);
  //   if (this.imeiData !='') {
  //     const sData = this.imeiData;
  //     this.formService.imeiDataSubmit(sData).subscribe((resp: APIResponse) => {
  //       if (resp.statusCode == 200) {
  //         setTimeout(() => {
  //           this.isData = false;
  //           this.sharedService.showSuccess("IMEI added successfully");
  //         }, 800);
  //       } else {
  //         this.sharedService.showError(resp.message);
  //       }
  //     }, (err: Error) => {
  //       this.sharedService.showError('Problem occurred, Please try again');
  //     })
  //   }
  // }
  // getListPvr() {
  //   const data1 = { "imeiNumber" : "356689055753792" };
  //   this.formService.getIMEIlist(data1).subscribe((resp: any) => {
  //      this.imeiData = resp.data.data;
  //     //console.log("Category imei - ", this.imeiData);
  //   });
  // }
  backClick() {
    this.router.navigate(['main/'])
  }

}
