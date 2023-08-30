import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-broadcast-message-view',
  templateUrl: './broadcast-message-view.component.html',
  styleUrls: ['./broadcast-message-view.component.scss']
})
export class BroadcastMessageViewComponent implements OnInit {
  msgList: any[];
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  issofficer: boolean = false;
  isSHO: boolean = false;
  userData: any;

  constructor(private formService: FormService, private router: Router, private sharedService: SharedService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    if (this.userData.data.roleId === 1) {
      this.isAdmin = true;
    } else if(this.userData.data.roleId === 2) {
      this.isDAdmin = true;
    } else if(this.userData.data.roleId === 3) {
      this.issofficer = true;
    } else if(this.userData.data.roleId === 4) {
      this.isSHO = true;
    }

    this.formService.getBroadcastList().subscribe((resp: any) => {
      this.msgList = resp.data;
    });
  }
  cancel() {
    if (this.isAdmin || this.isDAdmin){
      this.router.navigate(['/main/admin']);
    } else if(this.issofficer){
      this.router.navigate(['/main/so']);
    } else if(this.isSHO){
      this.router.navigate(['/main']);
    }
  }

}
