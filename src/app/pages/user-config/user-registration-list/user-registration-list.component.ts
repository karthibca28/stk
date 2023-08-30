import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from 'src/app/shared/services/auth.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/utilities/passwordvalidation';

@Component({
  selector: 'app-user-registration-list',
  templateUrl: './user-registration-list.component.html',
  styleUrls: ['./user-registration-list.component.scss']
})
export class UserRegistrationListComponent implements OnInit {
  // form: FormGroup;
  submitted: boolean = false;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable: any; 
  toDownload: boolean;
  userData: any;
  isDAdmin: boolean;
  upPwdModal: boolean;
  keyData: any;

  form: FormGroup = new FormGroup({
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  });

  constructor(private formService: FormService, private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private sharedService: SharedService, private confirmationService: ConfirmationService) { }
  
  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if(this.userData.data.roleId === 2) {
      this.isDAdmin = true;
    }
    this.getList();
    this.form = this.formBuilder.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: [PasswordValidation.match('password', 'confirmPassword')]
      }
    );
  }
  getList() {
    const fKey = {
        formKey : "user"
    }
    this.formService.getDynamicListData(fKey).subscribe((formData: any) => {
        this.dynamaicDataForTable = formData.data;
        this.toDownload = true;
    });
  }
  editRecord(userId:number){
    this.router.navigateByUrl(`main/user-config/user-form/${userId}`);
  }
  updatePwd(upData: any){
    this.upPwdModal = true;
    this.keyData = upData;
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  resetSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      const userId = this.keyData.id;
      const newPassword = this.form.value.password;
      const confirmPassword = this.form.value.confirmPassword;
      const data = { userId, newPassword, confirmPassword};
      this.authService.resetPassword(data).subscribe((resp: APIResponse) => {
        if (resp.statusCode == 200) {
          this.upPwdModal = false;
          this.form.reset();
          setTimeout(() => {
            this.router.navigate(['main/user-config/user-list']);
            this.sharedService.showSuccess(resp.message);
          }, 800);
        } else {
          this.sharedService.showError(resp.message);
        }
      });
    }
  }
  
  deleteRecord(userId:number){
    const dataKey = { formKey: 'user', deleteId: userId };
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.formService.deleteMasterList(dataKey).subscribe((resp: APIResponse) => {
                //console.log("datakey",dataKey);
                if (resp.statusCode == '200') {
                    this.getList();
                    this.sharedService.showSuccess('Record delete successfully');
                }
            })
        },
        reject: () => {
            this.sharedService.showWarn('Cencelled');
        }
    });
  }
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  openForm(){
    this.router.navigate(['main/user-config/user-form'])
  }
}