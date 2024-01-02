import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { JsonFormData } from 'src/app/shared/models/json-form-data';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';
import { MasterService } from 'src/app/shared/services/master.service';

@Component({
    selector: 'app-zone-list',
    templateUrl: './zone-list.component.html',
    styleUrls: ['./zone-list.component.scss'],
})
export class ZoneListComponent implements OnInit {
    public formData!: JsonFormData;
    title: string = 'Zone List';
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    cols: any[];
    tableData:any[]=[];
    dynamaicDataForTable: any;
    userData: any;
    isDistrictAdmin: boolean;
    toDownload:boolean;

    constructor(private masterService: MasterService, private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) {}

    ngOnInit() {
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
    console.log("LoginData", this.userData);
    this.isDistrictAdmin = this.userData.data.userData.rank.role.roleCode === "5";
        this.getList();
    }
    getList() {
        this.masterService.zone().subscribe((formData: any) => {
            const values = formData.data;
            const cols = [
              { field: 'code', header: 'Code', type: 'text' },
              { field: 'name', header: 'Name', type: 'text' },
              { field: 'administrationName', header: 'Administration', type: 'text' },
              { field: 'description', header: 'Description', type: 'text' },
             // { field: 'isActive', header: 'Status', type: 'text' },
            ];
            this.dynamaicDataForTable = {cols, values};
            console.log("master",this.dynamaicDataForTable)
        });
    }
    editRecord(zoneId:number){
        this.router.navigateByUrl(`main/master/zone-form/${zoneId}`);
    }
    deleteRecord(zoneId:number){
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the record?',
            accept: () => {
                this.masterService.deleteZoneList(zoneId).subscribe((resp: any) => {             
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
        this.router.navigate(['main/master/zone-form']);
    }
}
