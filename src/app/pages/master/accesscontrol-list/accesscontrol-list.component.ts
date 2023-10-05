import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-accesscontrol-list',
  templateUrl: './accesscontrol-list.component.html',
  styleUrls: ['./accesscontrol-list.component.scss']
})
export class AccesscontrolListComponent implements OnInit {

  dynamaicDataForTable:any

  constructor(private router: Router,private masterService:MasterService,private confirmationService: ConfirmationService,
    private sharedService: SharedService,) { }

  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.masterService.accessControlList().subscribe((formData: any) => {
        const values = formData.data;
        const cols = [
          { field: 'name', header: 'Name', type: 'text' },
          { field: 'description', header: 'Description', type: 'text' },
          { field: 'stateAccess', header: 'State Access', type: 'text' },
          { field: 'admAccess', header: 'Admin Access', type: 'text' },
          { field: 'zoneAccess', header: 'Zone Access', type: 'text' },
          { field: 'rangeAccess', header: 'Range Access', type: 'text' },
          { field: 'districtAccess', header: 'District Access', type: 'text' },
          { field: 'subDivAccess', header: 'SubDivision Access', type: 'text' },

        ];
        this.dynamaicDataForTable = {cols, values};
        console.log("master",this.dynamaicDataForTable)
    });
  }

  editRecord(accessControlId:any){
    // debugger
    this.router.navigate([`main/master/accesscontrol-form`,accessControlId])
  }
  deleteRecord(accessControlId:number){
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.masterService.deleteAccessControlList(accessControlId).subscribe((resp: any) => {             
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
    this.router.navigate(['main/master/accesscontrol-form']);
}
}
