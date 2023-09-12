import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: string = '';
  emailId = new FormControl('', Validators.required);
  display: boolean;
  check:boolean;
  userRole: any;
  hide = true;
  
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.initLoginForm();

  }
  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.authenticate(this.loginForm.value).subscribe((resp: any) => {
        console.log("login resp", resp)
        if (resp.data.session.accessToken) {
          sessionStorage.setItem('userInfo', JSON.stringify(resp));
          this.userRole = resp.data.userData.roleId;
          // console.log("role id", this.userRole);
          if (this.userRole === 4) {
            this.sharedService.showSuccess(resp.message);
            this.router.navigate(['/main/dashboard'])
          } else if (this.userRole === 3) {
            this.sharedService.showSuccess(resp.message);
            this.router.navigate(['/main/admin'])
          } else if (this.userRole === 5) {
            this.sharedService.showSuccess(resp.message);
            this.router.navigate(['/main/so'])
          } else {
            this.sharedService.showError('Access Denied!');
          }
        } else {
          this.sharedService.showError('User name or password mismatch');
          this.loginError = 'User name or password mismatch';
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  forgotPassword() {
    this.display = true;
  }
  submitFP() {
    if (this.emailId.valid) {

    } else {
      this.emailId.markAsTouched();
    }
  }
  cancel() {
    this.display = false;
  }
}
