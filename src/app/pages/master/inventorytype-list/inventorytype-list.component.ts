import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { MasterService } from 'src/app/shared/services/master.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-inventorytype-list',
  templateUrl: './inventorytype-list.component.html',
  styleUrls: ['./inventorytype-list.component.scss']
})
export class InventorytypeListComponent implements OnInit {
  dynamaicDataForTable:any;
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  //stateId:any;
  userData: any;
  isDistrictAdmin: boolean;

  constructor(private router: Router,private masterService:MasterService,private confirmationService: ConfirmationService,
    private sharedService: SharedService,) { }
  
  ngOnInit(): void {
    this.getList()
  }

  getList() {
    this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log("LoginData", this.userData);
    this.isDistrictAdmin = this.userData.data.userData.rank.role.roleCode === "5";
    this.masterService.inventoryTypeList().subscribe((formData: any) => {
        const values = formData.data;
        const cols = [
         // { field: 'fullName', header: 'FullName', type: 'text' },
          { field: 'inventoryType', header: 'Inventory Type', type: 'text' },
         { field: 'inventoryTypeCode', header: 'Inventory Type Code', type: 'text' },
         { field: 'description', header: 'Description', type: 'text' },


        ];
        this.dynamaicDataForTable = {cols, values};
        console.log("data",this.dynamaicDataForTable)
        // values.forEach((value) => {
        //   value.fullName = value.createdBy?.fullName; 
        // });  
    });
    
  }

  editRecord(stateId: number) {
      this.router.navigateByUrl(`main/master/inventorytype-form/${stateId}`);
  }
  
  deleteRecord(inventoryTypeId:number){
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the record?',
        accept: () => {
            this.masterService.deleteInventoryTypeList(inventoryTypeId).subscribe((resp: any) => {             
                  this.getList();
                  this.sharedService.showSuccess('Record deleted successfully');
            })
        },
        reject: () => {
            this.sharedService.showWarn('Cancelled');
        }
    });
  }
  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
}
  openForm() {
    this.router.navigate(['main/master/inventorytype-form']);
}
}
