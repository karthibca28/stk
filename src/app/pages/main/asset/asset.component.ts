import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {
  form!: FormGroup;
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
  admin:any
  zone:any
  range:any
  district:any
  subDivision:any
  policeStation:any
  zoneList: any
  rangeList: any
  districtList: any
  subDivisionList: any
  adminList: any
  stateList: any
  policeStationList: any
  data:any
  constructor(private masterService: MasterService,private formBuilder: FormBuilder,private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      adminId: [''],
      zoneId: [''],
      rangeId:[''],
      districtId: [''],
      subDivisionId: [''],
      policeStationId: [''],
    });
    this.getAccessControl()
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
    this.formService.getInventoryforSeniorOfficer(
      this.selected,
      this.form.value.adminId,
      this.form.value.zoneId,
      this.form.value.rangeId,
      this.form.value.districtId,
      this.form.value.subDivisionId,
      this.form.value.policeStationId
      ).subscribe((formData: any) => {
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
      ];
    });
  }
  getAdminList(id: any) {
    this.masterService.commonAdminList(id).subscribe((resp: any) => {
      this.adminList = resp.data
    });
  }


  getZoneList(id: any) {
    this.masterService.commonZone(id).subscribe((resp: any) => {
      this.zoneList = resp.data
    });
  }

  getRangeList(id: any) {
    this.masterService.commonRange(id).subscribe((resp: any) => {
      this.rangeList = resp.data
    });
  }
  getDistrictList(id: any) {
    this.masterService.commonDistrict(id).subscribe((resp: any) => {
      this.districtList = resp.data
    });
  }
  getSubDivision(id: any) {
    this.masterService.commonSubDivision(id).subscribe((resp: any) => {
      this.subDivisionList = resp.data
    });
  }
  getPoliceStaion(id: any) {
    this.masterService.commonPoliceStation(id).subscribe((resp: any) => {
      this.policeStationList = resp.data
    });
  }
  getAccessControl() {
    this.masterService.findAccessControl().subscribe((resp: any) => {
      this.data = resp.data;
      console.log(this.data)
      if (this.data.zoneId === true) {
        this.getZoneList(resp.data.inputId)
      }
      if (this.data.rangeId === true) {
        this.getRangeList(resp.data.inputId)
      }
      if (this.data.districtId === true) {
        this.getDistrictList(resp.data.inputId)
      }
      if (this.data.subDivisionId === true) {
        this.getSubDivision(resp.data.inputId)
      }
      if (this.data.adminId === true) {
        this.getAdminList(resp.data.inputId)
      }
      // if(this.data.stateId === true){
      // this.getStateList()
      // }
      if (this.data.policeStationId === true) {
        this.getPoliceStaion(resp.data.inputId)
      }
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
