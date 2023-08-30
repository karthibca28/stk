import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import { FormService } from 'src/app/shared/services/form.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { APIResponse } from 'src/app/shared/models/api-response';
import { ConfirmationService } from 'primeng/api';
import { JsonFormData } from 'src/app/shared/models/json-form-data';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
    title: string = 'Role List';
    public formData!: JsonFormData;
    @ViewChild('dt') table: Table;
    @ViewChild('filter') filter: ElementRef;
    cols: any[];
    tableData:any[]=[];
    dynamaicDataForTable: any; 
    toDownload:boolean;
    
    constructor(private formService: FormService, private router: Router, private sharedService: SharedService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.getList();
    }
    getList() {
        const fKey = {
            formKey : "master-role"
        }
        this.formService.getDynamicListData(fKey).subscribe((formData: any) => {
            this.dynamaicDataForTable = formData.data;
            this.toDownload = true;
        });
    }
    editRecord(roleId:number){
        this.router.navigateByUrl(`main/user-config/role-form/${roleId}`);
    }
    deleteRecord(roleId:number){
        const dataKey = { formKey: 'master-role', deleteId: roleId };
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the record?',
            accept: () => {
                this.formService.deleteMasterList(dataKey).subscribe((resp: APIResponse) => {
                    //console.log("datakey",dataKey);
                    if (resp.statusCode == '200') {
                        this.getList();
                        this.sharedService.showSuccess('Record delete successfully');
                    }
                })
            },
            reject: () => {
                this.sharedService.showWarn('Cencelled');
            }
        });
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    openForm() {
        this.router.navigate(['main/user-config/role-form']);
    }
}
