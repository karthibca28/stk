import { ApplicationRef, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { interval } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoaderService } from './shared/services/loader.service';

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
    private readonly swUpdate: SwUpdate, private cdRef: ChangeDetectorRef, private appRef: ApplicationRef) {
    // if (this.swUpdate.isEnabled) {
    // console.log('update avaialble');
    this.swUpdate.available.subscribe(() => {
      // this.display = true
      this.confirmUpdate();
    });



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
}
