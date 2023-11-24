import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from './shared/services/loader.service';
import { OneSignal } from 'onesignal-ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ConfirmationService]
})
export class AppComponent implements OnInit, OnDestroy {
  menuMode = 'sidebar';

  darkMode = 'light';

  topbarTheme = 'light';

  menuTheme = 'light';

  inputStyle = 'outlined';

  ripple: boolean;
  active: boolean = false;
  subscription!: Subscription;
  display: boolean = false;

  constructor(private primengConfig: PrimeNGConfig, public loader: LoaderService, private confirmationService: ConfirmationService,
    private readonly swUpdate: SwUpdate, private cdRef: ChangeDetectorRef, private appRef: ApplicationRef,private oneSignal: OneSignal) {
    // if (this.swUpdate.isEnabled) {
    // console.log('update avaialble');
    this.swUpdate.available.subscribe(() => {
      // this.display = true
      this.confirmUpdate();
      
    });
    this.initOneSignal();
    // }
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

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(7 * 60 * 60 * 1000);
        timeInterval.subscribe(() => {
          this.swUpdate.checkForUpdate().then(() => {
            this.confirmUpdate();
          })
        })
      }
    })
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.subsForLoader();
  }

  subsForLoader(): void {
    this.subscription = this.loader.status.subscribe((status: boolean) => {
      this.active = status;
      this.cdRef.detectChanges();
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async initOneSignal() {
    console.log("OneSignal Init");
    await this.oneSignal.init({
      appId: "0788f57e-e8b1-4862-a562-dc04e312d215",
      allowLocalhostAsSecureOrigin: true,
      promptOptions: {
        /* These prompt options values configure both the HTTP prompt and the HTTP popup. */
        /* actionMessage limited to 90 characters */
        actionMessage: "Kidnly allow to show you notifications for the latest updates.",
        /* acceptButtonText limited to 15 characters */
        acceptButtonText: "ALLOW",
        /* cancelButtonText limited to 15 characters */
        cancelButtonText: "NO THANKS",},
      }).then(() => {
        console.log("OneSignal Initialized");
        this.oneSignal.setConsentRequired(true);
        this.oneSignal.setConsentGiven(true);
        console.log(" this.oneSignal.Notifications.permission",  this.oneSignal.Notifications.permission);
        this.oneSignal.Notifications.requestPermission().then((status) => {
          console.log("Notification permission status:", status);
        }
        );
      }).catch((err) => {
        console.log("OneSignal Initialization Error", err);
      });
      
    }

}
