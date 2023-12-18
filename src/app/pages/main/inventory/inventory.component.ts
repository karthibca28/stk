import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Table } from 'exceljs';
import { ConfirmationService } from 'primeng/api';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
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
    // this.getList();
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
    // this.getList(); 
  }
  // getList() {
  //   this.formService.getInventoryforSeniorOfficer(this.selected).subscribe((formData: any) => {
  //     const values = formData.data;
  //     const cols = [
  //       { field: 'itemName', header: 'Item Name', type: 'text' },
  //       { field: 'model', header: 'Model', type: 'text' },
  //       { field: 'description', header: 'Description', type: 'text' },
  //       { field: 'year', header: 'Year', type: 'text' },
  //       { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
  //       { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
  //     ];
  //     this.dynamaicDataForTable = {cols, values};
  // });
  // }

  getInventorySummary() {
    this.formService.getInventorySummaryforSeniorOfficer().subscribe((formData: any) => {
      this.inventoryItems = [
        {
          type: this.replaceUnderscore(formData.data.CAR.type),
          imageSrc: '../../../../assets/inventory/Vechile.png',
          count: formData.data.CAR.count
        },
        {
          type: this.replaceUnderscore(formData.data.BARRICADES.type),
          imageSrc: '../../../../assets/inventory/Barricade.png',
          count: formData.data.BARRICADES.count
        },
        {
          type: this.replaceUnderscore(formData.data.COMPUTER.type),
          imageSrc: '../../../../assets/inventory/Computer.png',
          count: formData.data.COMPUTER.count
        },
        {
          type: this.replaceUnderscore(formData.data.WALKIETALKIE.type),
          imageSrc: '../../../../assets/inventory/Walkitakie.png',
          count: formData.data.WALKIETALKIE.count
        },
        {
          type: this.replaceUnderscore(formData.data.TABLE_CHAIR.type),
          imageSrc: '../../../../assets/inventory/Table and chair.png',
          count: formData.data.TABLE_CHAIR.count
        },
        {
          type: this.replaceUnderscore(formData.data.CHALLAN_DEVICE.type),
          imageSrc: '../../../../assets/inventory/Challan Machile.png',
          count: formData.data.CHALLAN_DEVICE.count
        }
      ];
    });
  }
  
  replaceUnderscore(type: string): string {
    return type.replace(/_/g, '-'); // Replace underscores with spaces in the type
  }
  

  
  
  // clear(table: Table) {
  //     table.clear();
  //     this.filter.nativeElement.value = '';
  // }

}
