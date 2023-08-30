import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { APIResponse } from 'src/app/shared/models/api-response';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-vehicle-blacklist',
  templateUrl: './vehicle-blacklist.component.html',
  styleUrls: ['./vehicle-blacklist.component.scss']
})
export class VehicleBlacklistComponent implements OnInit {
  dynamaicDataForTable: any;
  isAdmin: boolean = false;
  isDAdmin: boolean = false;
  issofficer: boolean = false;
  isSHO: boolean = false;
  userData: any;
  toDownload: boolean;

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
    const data = { "isPagination" : false }
    this.formService.getBlockedVehicleListWeb(data).subscribe((resp: any) => {
      this.dynamaicDataForTable = resp.data;
      this.toDownload = true;
    });
  }
  editRecord(vehicleBId:number){
    this.router.navigateByUrl(`main/add-vehicle-blacklist/${vehicleBId}`);
  }
  deleteRecord(distId:number){
    // const dataKey = { formKey: 'master-district', deleteId: distId };
    // this.confirmationService.confirm({
    //     message: 'Are you sure you want to delete the record?',
    //     accept: () => {
    //         this.formService.deleteMasterList(dataKey).subscribe((resp: APIResponse) => {
    //             if (resp.statusCode == '200') {
    //               this.getList();
    //               this.sharedService.showSuccess('Record deleted successfully');
    //             }
    //         })
    //     },
    //     reject: () => {
    //         this.sharedService.showWarn('Cencelled');
    //     }
    // });
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