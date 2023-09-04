import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {

    model: any[];
    userData: any;
    isSHO: boolean;
    myDate = new Date();
    userName: any;
    roleName: any;
    constructor(public appMain: AppMainComponent, private router: Router) {}

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '1,2,3', routerLink: ['/main/admin'] },
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '5', routerLink: ['/main/so'] },
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '4', routerLink: ['/main'] },
            // Admin
            {
                label: 'Users', icon: 'far fa-user-circle', access: '5', routerLink: ['/main/user-config'],
                items: [
                    // { label: 'Department', icon: 'pi pi-image', routerLink: ['/main/user-config/department-list'] },
                    { label: 'User Registration', icon: 'pi pi-id-card', routerLink: ['/main/user-config/user-list'] },
                    // { label: 'Role Permission', icon: 'pi pi-share-alt', routerLink: ['/main/user-config/role-permission-list'] },
                    // { label: 'Rank', icon: 'pi pi-circle-off', routerLink: ['/main/user-config/rank-list'] },
                    { label: 'Role Master', icon: 'pi pi-check-square', routerLink: ['/main/user-config/role-list'] }
                ]
            },
            {
                label: 'Master', icon: 'fas fa-database', access: '1', routerLink: ['/main/master'],
                items: [
                    { label: 'State', icon: 'pi pi-file', routerLink: ['/main/master/state-list'] }, 
                    { label: 'Zone', icon: 'pi pi-file', routerLink: ['/main/master/zone-list'] },
                    { label: 'Range', icon: 'pi pi-file', routerLink: ['/main/master/range-list'] },
                    { label: 'District', icon: 'pi pi-file', routerLink: ['/main/master/district-list'] },
                    { label: 'Sub Division', icon: 'pi pi-file', routerLink: ['/main/master/sub-division-list'] },
                    { label: 'Police Station', icon: 'pi pi-file', routerLink: ['/main/master/police-station-list'] },
                    // { label: 'Hierarchy', icon: 'pi pi-bookmark', routerLink: ['/main/master/hierarchy-list'] }, 
                    { label: 'Incident Type', icon: 'pi pi-file', routerLink: ['/main/master/incident-report-list'] },
                    { label: 'Location Category', icon: 'pi pi-file', routerLink: ['/main/master/premises-list'] },
                    { label: 'Location sub-Category', icon: 'pi pi-file', routerLink: ['/main/master/premises-check-list'] },
                    { label: 'Map Location', icon: 'pi pi-file', routerLink: ['/main/master/locationMap'] }
                ]
            },
            { label: 'Duty Points DB', icon: 'fa fa-bandcamp', access: '4,5', routerLink: ['/main/lot/dutyPoints'] },
            // {
            //     label: 'Performance', icon: 'pi pi-file', access: '1', routerLink: ['/main/performance'],
            //     items: [
            //         { label: 'Overall', icon: 'pi pi-file-pdf', routerLink: ['/main/performance/overall'] },
            //         { label: 'Report', icon: 'pi pi-file-pdf', routerLink: ['/main/performance/performReport'] }
            //     ]
            // },
            // {
            //     label: 'Reports', icon: 'pi pi-compass', access: '1', routerLink: ['/main/reports'],
            //     items: [
            //         { label: 'State', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/state-summary'] },
            //         { label: 'District', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/district-summary'] },
            //         { label: 'Police Station', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/ps-summary'] },
            //         { label: 'All - Summary', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/admin-report'] },
            //         { label: 'All - Detailed', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/admin-detail-report'] }
            //     ]
            // },
            // Dist.Admin
            {
                label: 'Users', icon: 'far fa-user-circle', access: '2', routerLink: ['/main/user-config'],
                items: [
                    { label: 'User', icon: 'pi pi-id-card', routerLink: ['/main/user-config/user-list'] }
                ]
            },
            {
                label: 'Master', icon: 'fas fa-paste', access: '5', routerLink: ['/main/master'],
                items: [
                    // { label: 'State', icon: 'pi pi-file', routerLink: ['/main/master/state-list'] },
                    { label: 'Administration', icon: 'pi pi-file', routerLink: ['/main/master/administration'] },
                    { label: 'Zone', icon: 'pi pi-file', routerLink: ['/main/master/zone-list'] },
                    { label: 'Range', icon: 'pi pi-file', routerLink: ['/main/master/range-list'] },
                    { label: 'District', icon: 'pi pi-file', routerLink: ['/main/master/district-list'] },
                    { label: 'Sub Division', icon: 'pi pi-file', routerLink: ['/main/master/sub-division-list'] },
                    { label: 'Police Station', icon: 'pi pi-file', routerLink: ['/main/master/police-station-list'] },
                ]
            },
            // {
            //     label: 'Reports', icon: 'pi pi-compass', access: '2', routerLink: ['/main/reports'],
            //     items: [
            //         { label: 'Police Station', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/distReport'] },
            //         { label: 'All - Summary', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/admin-report'] },
            //         { label: 'All - Detailed', icon: 'pi pi-file-pdf', routerLink: ['/main/reports/admin-detail-report'] }
            //     ]
            // },
            // Senior officer
            {
                label: 'Inventory', icon: 'fab fa-delicious', access: '4,5', routerLink: ['/main/lot/assetList']
            },
            {
                label: 'Report', icon: 'fab fa-delicious', access: '4,5', routerLink: ['/main/performance/report']
            },
            {
                label: 'Report', icon: 'fas fa-database', access: '3', routerLink: ['/main/reports'],
                items: [
                    { label: 'Summary Report', icon: 'pi pi-file', routerLink: ['/main/reports/soSummaryReport'] },
                    { label: 'Detail Report', icon: 'pi pi-file', routerLink: ['/main/reports/soDetailReport'] },
                    { label: 'Date Wise Report', icon: 'pi pi-file', routerLink: ['/main/reports/DatewiseReport'] },
                    { label: 'Activity Summary', icon: 'pi pi-file', routerLink: ['/main/reports/activitySummary'] },
                    { label: 'Location Report', icon: 'pi pi-file', routerLink: ['/main/reports/locationReport'] }
                ]
            },
            { label: 'Settings', icon: 'fa fa-cog', access: '1,2,4', routerLink: ['/main/settings'] },
        ];
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
        this.userName = this.userData.data.firstName;
        this.roleName = this.userData.data.roleName; 
        if (this.userData.data.userData.roleId === 1) { 
            this.model = this.model.filter(f => f.access.includes('1'))
        } else if(this.userData.data.userData.roleId === 2) {
            this.model = this.model.filter(f => f.access.includes('2'))
        } else if(this.userData.data.userData.roleId === 3) {
            this.model = this.model.filter(f => f.access.includes('3'))
        } else if(this.userData.data.userData.roleId === 4) {
            this.model = this.model.filter(f => f.access.includes('4'))
        } else if(this.userData.data.userData.roleId === 5) {
            this.model = this.model.filter(f => f.access.includes('5'))
        } else {}
        // else {
        //     this.model = this.model.filter(f => f.access.includes('5'))
        // }

    }
    
    logout() {
        this.router.navigate(['/']);
        sessionStorage.removeItem('userInfo');
    }
}