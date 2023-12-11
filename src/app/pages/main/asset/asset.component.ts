import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData:any[]=[];
  dynamaicDataForTable :any;
  inventoryItems: any[] = [];  
  selected = '';
  roleId:any
  isAdmin:boolean = false;
  isDAdmin:boolean = false;
  constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
    this.getInventorySummary();
    const userData = JSON.parse(sessionStorage.getItem('userInfo'));
    this.roleId = parseInt(userData.data.userData.rank.role.roleCode)
    if (this.roleId === 6) {
      this.isAdmin = true;
    } else if(this.roleId === 2) {
      this.isDAdmin = true;
    }
  }
  onSelectionChange(event: any) {
    this.selected = event.value;
    this.getList(); 
  }
  getList() {
    this.formService.getInventoryforSeniorOfficer(this.selected).subscribe((formData: any) => {
      const values = formData.data;
      const cols = [
        { field: 'itemName', header: 'Item Name', type: 'text' },
        { field: 'model', header: 'Model', type: 'text' },
        { field: 'description', header: 'Description', type: 'text' },
        { field: 'year', header: 'Year', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
      ];
      this.dynamaicDataForTable = {cols, values};
  });
  }

  getInventorySummary() {
    this.formService.getInventorySummaryforSeniorOfficer().subscribe((formData: any) => {
      this.inventoryItems = [
        {
          type: this.replaceUnderscore(formData.data.CHALLAN_DEVICE?.type),
          imageSrc: '../../../../assets/task/Challan Machile.png',
          count: formData.data.CHALLAN_DEVICE?.count
        },
        {
          type: this.replaceUnderscore(formData.data.SIGNAL?.type),
          imageSrc: '../../../../assets/Duty/icons8-traffic-48.png',
          count: formData.data.SIGNAL?.count
        },
        {
          type: this.replaceUnderscore(formData.data.CAR?.type),
          imageSrc: '../../../../assets/inventory/Vechile.png',
          count: formData.data.CAR?.count
        },
        // {
        //   type: this.replaceUnderscore(formData.data.WALKIETALKIE?.type),
        //   imageSrc: '../../../../assets/inventory/Walkitakie.png',
        //   count: formData.data.WALKIETALKIE?.count
        // },
        // {
        //   type: this.replaceUnderscore(formData.data.TABLE_CHAIR?.type),
        //   imageSrc: '../../../../assets/inventory/Table and chair.png',
        //   count: formData.data.TABLE_CHAIR?.count
        // },
        // {
        //   type: this.replaceUnderscore(formData.data.CHALLAN_DEVICE?.type),
        //   imageSrc: '../../../../assets/inventory/Challan Machile.png',
        //   count: formData.data.CHALLAN_DEVICE?.count
        // }
      ];
    });
  }
  
  replaceUnderscore(type: string): string {
    return type?.replace(/_/g, '-'); // Replace underscores with spaces in the type
  }
  

  
  
  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }

}
