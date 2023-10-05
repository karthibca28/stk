import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-rank-list',
  templateUrl: './rank-list.component.html',
  styleUrls: ['./rank-list.component.scss']
})
export class RankListComponent implements OnInit {

  dynamaicDataForTable:any

  constructor(private router: Router,private masterService:MasterService,private confirmationService: ConfirmationService,
    private sharedService: SharedService,) { }
  
  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.masterService.rankList().subscribe((formData: any) => {
        const values = formData.data;
        const cols = [
          { field: 'rankName', header: 'Rank Name', type: 'text' },
          { field: 'description', header: 'Description', type: 'text' },
          { field: 'roleName', header: 'Role Name', type: 'text' },

        ];
        this.dynamaicDataForTable = {cols, values};
        console.log("master",this.dynamaicDataForTable)
        values.forEach((value) => {
          value.roleName = value.role?.roleName; 
        });        
    });
  }

  editRecord(rankId:any){
   this.router.navigate([`main/master/rank-form`,rankId])
  }
  deleteRecord(rankId:number){
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.masterService.deleteRankList(rankId).subscribe((resp: any) => {             
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
    this.router.navigate(['main/master/rank-form']);
}
}
