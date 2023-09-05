import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AppComponent } from './app.component';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from './utilities/passwordvalidation';
import { DialogModule } from 'primeng/dialog';
import { SwUpdate } from '@angular/service-worker';
import { AuthService } from './shared/services/auth.service';
import { SharedService } from './shared/services/shared.service';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./shared/components/dynamic-form/dynamic-form.component.scss']
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    subscription: Subscription;
    resetPasswordForm: FormGroup;
    items: MenuItem[];
    ResetModal: boolean; displaySOS: boolean = false;
    userName: string = '';
    roleName: string = '';
    showThemeConfig: boolean = false;
    userData: any;
    isSHO: any;
    isAdmin: any;
    userId: any;
    isMediumDevice: boolean = false;
    constructor(public app: AppComponent, private formBuilder: FormBuilder, private confirmationService: ConfirmationService,
        private renderer: Renderer2, private el: ElementRef,
        private swUpdate: SwUpdate, public appMain: AppMainComponent, private router: Router, private authService: AuthService, private sharedService: SharedService) {
    }
    // gpfCpsNo


    ngOnInit(): void {
        
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
        if (this.userData.data.roleId === 3 || this.userData.data.roleId === 4) {
            this.isSHO = true;
          } else if(this.userData.data.roleId === 1 || this.userData.data.roleId === 2) {
            this.isAdmin = true;
          }
        this.userName = this.userData.data.userData.firstName;
        this.roleName = this.userData.data.userData.gpfCpsNo;
        this.userId = this.userData.data.userId;
        this.initResetPwdForm();
    }
    initResetPwdForm() {
        this.resetPasswordForm = this.formBuilder.group(
            {
                currentPassword: ['', Validators.required],
                newPassword: ['', Validators.required],
                confirmPassword: ['', Validators.required],
            },
            {
                validators: [PasswordValidation.match('newPassword', 'confirmPassword')]
            }
        );
        this.checkDeviceSize();
    }
    checkForUpdates() {
        this.confirmUpdate();
        // this.swUpdate.available.subscribe(() => {
        //     // this.display = true
           
        // });
    }
    confirmUpdate() {
        this.confirmationService.confirm({
            message: 'Update Available for this app! Do you want to update this app?',
            accept: () => {
                this.updateSw();
            },
            reject: () => {
                // this.closeDialog();
            }
        });
    }

    updateSw() {
        this.swUpdate.activateUpdate().then(() => {
            location.reload();
        })
    }
    showSosDialog() {
        this.displaySOS = true;
    }
    close() {
        this.router.navigate(['/main']);
    }
    logout() {
        this.router.navigate(['/']);
        sessionStorage.removeItem('userInfo');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    resetpassword() {
        this.ResetModal = true;
    }
    onResetSubmit() {
        if (this.resetPasswordForm.valid) {
            const userId = this.userId;
            const currentPassword = this.resetPasswordForm.value.currentPassword;
            const newPassword = this.resetPasswordForm.value.newPassword;
            const confirmPassword = this.resetPasswordForm.value.confirmPassword;
            const dataForm = {userId, currentPassword, newPassword, confirmPassword};
            //console.log("data", dataForm);
            this.authService.changePassword(dataForm).subscribe((resp: any) => {
                if (resp.statusCode == 200) {
                    this.sharedService.showSuccess(resp.message);
                    setTimeout(() => {
                        this.ResetModal = false;
                    }, 1000);
                } else {
                    this.sharedService.showError(resp.message);
                }
            }, (err: Error) => {
                this.sharedService.showError('Problem occurred, Please try again');
            });
        } else {
          this.resetPasswordForm.markAllAsTouched();
        }
    }
    openForm(){
        this.router.navigate(['main/user-config/user-form'])
    }
    @HostListener('window:resize', ['$event'])
    onResize(event: any) {
      this.checkDeviceSize();
    }
  
    checkDeviceSize() {

      this.isMediumDevice = window.innerWidth <= 990;
      const element = this.el.nativeElement.querySelector('.layout-topbar-left'); 
      if (this.isMediumDevice) {
        this.renderer.setStyle(element, 'padding', '10px');
      } else {
        this.renderer.removeStyle(element, 'padding');
      }
    }
}
