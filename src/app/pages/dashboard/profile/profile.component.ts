import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userData: any;
  userId:any
  profiledata:any
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  issofficer: boolean = false;
  isSHO: boolean = false;
  Admin:boolean = false;
  DistAdmin:boolean = false;
  roleId:any

  constructor(private router: Router, private formService: FormService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.roleId = parseInt(this.userData.data.userData.rank.role.roleCode)
    if (this.roleId === 1) {
      this.isAdmin = true;
    } else if(this.roleId === 2) {
      this.isDAdmin = true;
    } else if(this.roleId === 3) {
      this.issofficer = true;
    } else if(this.roleId === 4) {
      this.isSHO  = true;
    }
    else if(this.roleId === 5) {
      this.DistAdmin  = true;
    }
    else if(this.roleId === 6) {
      this.Admin  = true;
    }
    // this.userId=this.userData.data.userData.id
    this.getUserData();
  }
  getUserData() { 
    const userId = this.userData.data.userData.id
    console.log(userId)
    this.formService.getProfile(userId).subscribe((resp: APIResponse) => {
      this.profiledata = resp.data;
      //console.log("USer data ", this.userData);
    });
  }
  backClick() {
    if (this.isAdmin || this.isDAdmin){
      this.router.navigate(['/main/admin']);
    } else if(this.issofficer){
      this.router.navigate(['/main/so']);
    } else if(this.isSHO){
      this.router.navigate(['/main']);
    }
  }
}
