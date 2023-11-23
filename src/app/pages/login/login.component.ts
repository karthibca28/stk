import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { OneSignal } from 'onesignal-ngx';

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
  
  constructor(private authService: AuthService, private router: Router, private sharedService: SharedService,
    private loadingService: LoadingService,private oneSignal: OneSignal) { 

    }

  ngOnInit(): void {
    this.initLoginForm();
    // this.oneSignal.init({
    //   appId: "0788f57e-e8b1-4862-a562-dc04e312d215",
    //   allowLocalhostAsSecureOrigin: true,
    // autoRegister: true,
    // notifyButton: {
    //   enable: true,
    // },
    //   promptOptions: {
    //     /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
    //     /* actionMessage limited to 90 characters */
    //     actionMessage: "We'd like to show you notifications for the latest news and updates.",
    //     /* acceptButtonText limited to 15 characters */
    //   },
    // });
    this.oneSignal.Slidedown.promptPush();
  }
  initLoginForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loadingService.showLoader();
      this.authService.authenticate(this.loginForm.value).subscribe(
        (resp: any) => {
          console.log("login resp", resp)
          if (resp.data.session.accessToken) {
            this.oneSignal.login(resp.data.userData.id);
            sessionStorage.setItem('userInfo', JSON.stringify(resp));
            this.userRole = parseInt(resp.data.userData.rank.role.roleCode);
            let navigateTo = '';
            let successMessage = '';
            switch (this.userRole) {
              case 4:
                navigateTo = '/main/dashboard';
                successMessage = resp.message;
                break;
              case 3:
                navigateTo = '/main/admin';
                successMessage = resp.message;
                break;
                case 5:
                  navigateTo = '/main/so';
                  successMessage = resp.message;
                  break;
              case 6:
                navigateTo = '/main/so';
                successMessage = resp.message;
                break;
              default:
                this.sharedService.showError('Access Denied!');
                break;
            }
            if (navigateTo) {
              this.sharedService.showSuccess(successMessage);
              this.router.navigate([navigateTo]);
            }
            // this.oneSignal.setExternalUserId(resp.data.userData.id).then(response => {
            //   console.log('External user ID set:', response);
            // })
          } else {
            this.sharedService.showError('User name or password mismatch');
            this.loginError = 'User name or password mismatch';
          }
        },
        (error) => {
          this.sharedService.showError('An error occurred during authentication');
          this.loginError = 'An error occurred during authentication';
        }
      ).add(() => {
        this.loadingService.hideLoader();
      });
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
