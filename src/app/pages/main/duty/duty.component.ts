import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {
  @ViewChild('dt') table: Table;
  @ViewChild('filter') filter: ElementRef;
  cols: any[];
  tableData: any[] = [];
  dynamaicDataForTable: any
  DutyItems: any[] = [];
  selected = ''
  data: any
  zoneList: any
  rangeList: any
  districtList: any
  subDivisionList: any
  adminList: any
  stateList: any
  policeStationList: any
  admin:any
  zone:any
  range:any
  district:any
  subDivision:any
  policeStation:any

  constructor(private masterService: MasterService, private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getList();
    this.getDutySummary()
    this.getAccessControl()
  }
  onSelectionChange(event: any) {
    this.selected = event.value;
    this.getList();
  }
  onAdminChange(event: any) {
    this.admin = event.value;
    this.getList();
  }
  onZoneChange(event: any) {
    this.zone = event.value;
    this.getList();
  }
  onRangeChange(event: any) {
    this.range = event.value;
    this.getList();
  }
  onDistrictChange(event: any) {
    this.district = event.value;
    this.getList();
  }
  onSubDivisionChange(event: any) {
    this.subDivision = event.value;
    this.getList();
  }
  onPoliceStationChange(event: any) {
    this.policeStation = event.value;
    this.getList();
  }

  getList() {
    this.formService.getDutyforSeniorOfficer(
      this.selected,
      this.admin,
      this.zone,
      this.range,
      this.district,
      this.subDivision,
      this.policeStation
    ).subscribe((formData: any) => {
      const values = formData.data;
      console.log(formData.data)
      const cols = [
        { field: 'dutyType', header: 'Duty Type', type: 'text' },
        { field: 'status', header: 'Status', type: 'text' },
        { field: 'subDivisionName', header: 'Sub Division Name', type: 'text' },
        { field: 'policeStationName', header: 'Police Station Name', type: 'text' },
        { field: 'startLocationName', header: 'Start Location Name', type: 'text' },
        { field: 'endLocationName', header: 'End Location Name', type: 'text' },
      ];
      this.dynamaicDataForTable = { cols, values };
      console.log("master", this.dynamaicDataForTable)
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
  getDutySummary() {
    this.formService.getDutySummaryforSeniorOfficer().subscribe((formData: any) => {
      this.DutyItems = [
        {
          type: this.replaceUnderscores(formData.data.JUNCTION_POINT.type),
          imageSrc: '../../../../assets/task/ENCROACHMENT_REPORT.png',
          count: formData.data.JUNCTION_POINT.count
        },
        {
          type: this.replaceUnderscores(formData.data.PATROL_DUTY.type),
          imageSrc: '../../../../assets/Duty/icons8-traffic-48.png',
          count: formData.data.PATROL_DUTY.count
        },
        {
          type: this.replaceUnderscores(formData.data.SECTOR_DUTY.type),
          imageSrc: '../../../../assets/Duty/icons8-traffic-jam-48.png',
          count: formData.data.SECTOR_DUTY.count
        },
        {
          type: this.replaceUnderscores(formData.data.VEHICLE_CHECK.type),
          imageSrc: '../../../../assets/Duty/icons8-vip-48.png',
          count: formData.data.VEHICLE_CHECK.count
        }
      ];
    });
  }

  replaceUnderscores(type: string): string {
    return type.replace(/_/, '-'); // Replace underscores with spaces in the type
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }

}
