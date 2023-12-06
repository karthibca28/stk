import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss']
})
export class BroadcastComponent implements OnInit {

  constructor(private formService: FormService,private router: Router) { }

  dynamaicDataForTable:any
  roleId:any

  ngOnInit(): void {
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.roleId = userData.data.userData.roleId
    console.log(this.roleId)
    this.getList();
  }

  getList() {
    this.formService.getBroadCastforSeniorOfficer().subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data)
      const cols = [
        { field: 'title', header: 'Title', type: 'text' },
        { field: 'message', header: 'Message', type: 'text' },
        { field: 'fullName', header: 'Full Name', type: 'text' },
      ];
      values.forEach((value) => {
        value.fullName = value.createdBy?.fullName; 
      });
      this.dynamaicDataForTable = {cols, values};
      console.log("master",this.dynamaicDataForTable)
  });
  }
  viewRecord(broadcastId:any){
    this.router.navigate([`main/lot/view-broadCast`,broadcastId])
  }
}
