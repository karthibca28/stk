import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent implements OnInit {

  dynamaicDataForTable:any;
  userData: any;
  isDistrictAdmin: boolean;

  constructor(private router: Router,private masterService:MasterService,private confirmationService: ConfirmationService,
    private sharedService: SharedService,) { }
  ngOnInit(): void {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log("LoginData", this.userData);
    this.isDistrictAdmin = this.userData.data.userData.rank.role.roleCode === "5";
    this.getList()
  }

  getList() {
    this.masterService.roleList().subscribe((formData: any) => {
        const values = formData.data;
        const cols = [
          { field: 'roleCode', header: 'Role Code', type: 'text' },
          { field: 'roleName', header: 'Role Name', type: 'text' },
          { field: 'description', header: 'Description', type: 'text' },

        ];
        this.dynamaicDataForTable = {cols, values};
        console.log("master",this.dynamaicDataForTable)
    });
  }

  editRecord(roleId:any){
    this.router.navigate([`main/user-config/role-form`,roleId])
  }
  deleteRecord(roleId:number){
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.masterService.deleteRoleList(roleId).subscribe((resp: any) => {             
                  this.getList();
                  this.sharedService.showSuccess('Record deleted successfully');
            })
        },
        reject: () => {
            this.sharedService.showWarn('Cancelled');
        }
    });
  }
  openForm() {
    this.router.navigate(['main/user-config/role-form']);
}
}
