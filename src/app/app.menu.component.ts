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
    roleId: any;
    constructor(public appMain: AppMainComponent, private router: Router) { }

    ngOnInit() {
        this.model = [
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '1,2', routerLink: ['/main/admin'] },
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '5,6', routerLink: ['/main/so'] },
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '4', routerLink: ['/main/dashboard'] },
            { label: 'Dashboard', icon: 'fa fa-tachometer', access: '3', routerLink: ['/main/duty/sho-home'] },
            { label: 'BroadCast', icon: 'fa fa-bullhorn', access: '3,4,5,6', routerLink: ['/main/lot/broadCast'] },
            { label: 'User', icon: 'far fa-user-circle', access: '4', routerLink: ['/main/lot/userList'] },
            { label: 'Live-Data', icon: 'fa fa-car', access: '3,4', routerLink: ['/main/lot/live-user'] },
            { label: 'Duty', icon: 'fa fa-list-alt', access: '4', routerLink: ['/main/lot/dutyList'] },
            { label: 'Task', icon: 'fa fa-tasks', access: '4', routerLink: ['/main/lot/taskList'] },
            // Admin
            {
                label: 'Users', icon: 'far fa-user-circle', access: '5,6', routerLink: ['/main/user-config'],
                items: [
                    // { label: 'Department', icon: 'pi pi-image', routerLink: ['/main/user-config/department-list'] },
                    { label: 'User Registration', icon: 'pi pi-id-card', routerLink: ['/main/user-config/user-list'] },
                    // { label: 'Role Permission', icon: 'pi pi-share-alt', routerLink: ['/main/user-config/role-permission-list'] },
                    // { label: 'Rank', icon: 'pi pi-circle-off', routerLink: ['/main/user-config/rank-list'] },
                    // { label: 'Role Master', icon: 'pi pi-check-square', routerLink: ['/main/user-config/role-list'] }
                    { label: 'Access Control', icon: 'pi pi-file', routerLink: ['/main/user-config/accesscontrol-list'] },
                    { label: 'Rank Master', icon: 'pi pi-file', routerLink: ['/main/user-config/rank-list'] },
                    { label: 'Role Master', icon: 'pi pi-file', routerLink: ['/main/user-config/role-list'] },
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
            // Dist.Admin
            {
                label: 'Users', icon: 'far fa-user-circle', access: '2', routerLink: ['/main/user-config'],
                items: [
                    { label: 'User', icon: 'pi pi-id-card', routerLink: ['/main/user-config/user-list'] }
                ]
            },
            {
                label: 'Master', icon: 'fas fa-paste', access: '5,6', routerLink: ['/main/master'],
                items: [
                    // { label: 'State', icon: 'pi pi-file', routerLink: ['/main/master/state-list'] },
                    { label: 'Administration', icon: 'pi pi-file', routerLink: ['/main/master/administration'] },
                    { label: 'Zone', icon: 'pi pi-file', routerLink: ['/main/master/zone-list'] },
                    { label: 'Range', icon: 'pi pi-file', routerLink: ['/main/master/range-list'] },
                    { label: 'District', icon: 'pi pi-file', routerLink: ['/main/master/district-list'] },
                    { label: 'Sub Division', icon: 'pi pi-file', routerLink: ['/main/master/sub-division-list'] },
                    { label: 'Police Station', icon: 'pi pi-file', routerLink: ['/main/master/police-station-list'] },

                    { label: 'Inventory Type', icon: 'pi pi-file', routerLink: ['/main/master/inventorytype-list'] },

                ]
            },
            // Senior officer
            {
                label: 'Inventory', icon: 'fab fa-delicious', access: '4', routerLink: ['/main/lot/assetList']
            },
            // {
            //     label: 'Inventory', icon: 'fab fa-delicious', access: '6', routerLink: ['/main/lot/inventory']
            // },
            {
                label: 'Report', icon: 'fab fa-delicious', access: '4,5,6', routerLink: ['/main/performance/report']
            },
            ,
            {
                label: 'VIP-Routes', icon: 'fa fa-car', access: '4', routerLink: ['/main/lot/vip-Routes']
            },

            {
                label: 'PoliceStation', icon: 'fa fa-home', access: '4', routerLink: ['/main/lot/policeStation']
            },
            // SHO
           
            { label: 'Settings', icon: 'fa fa-cog', access: '1,2,4', routerLink: ['/main/settings'] },

            //testsho
            {
                label: 'Database', icon: 'fa fa-database', access: '3', routerLink: ['/main/duty'],
                items: [
                    { label: 'Duty Point', icon: 'pi pi-file', routerLink: ['/main/duty/duty-point-list'] },
                    { label: 'Dynamic Vechile Point', icon: 'pi pi-file', routerLink: ['/main/duty/dynamic-vechile-point'] },
                    { label: 'Fixed VIP Routes', icon: 'pi pi-file', routerLink: ['/main/duty/vip-route-list'] },
                ]
            },
            {
                label: 'Duty', icon: 'fa fa-list-alt', access: '3', routerLink: ['/main/duty/duty-list'],
                // items: [
                //     { label: 'Assign Duty', icon: 'pi pi-file', routerLink: ['/main/duty/duty-list'] },
                // ]
            },
            {
                label: 'Defective Signals', icon: 'fas fa-signal', access: '3', routerLink: ['/main/duty/defective-signal-list'],
            },
            {
                label: 'Inventory Management', icon: 'fab fa-delicious', access: '3', routerLink: ['/main/duty/inventory-list'],
            },
            // {
            //     label: 'Live Map', icon: 'fas fa-map-marker', access: '3', routerLink: ['/main/duty'],
            // },
            {
                label: 'SOS Alert', icon: 'fas fa-bell', access: '3', routerLink: ['/main/duty/sos-list'],
            },
            {
                label: 'Report', icon: 'fab fa-delicious', access: '3', routerLink: ['/main/reports'],
                items: [
                    { label: 'Summary Report', icon: 'pi pi-file', routerLink: ['/main/reports/soSummaryReport'] },
                    { label: 'Detail Report', icon: 'pi pi-file', routerLink: ['/main/reports/soDetailReport'] },
                ]
            }

        ];
        this.userData = JSON.parse(sessionStorage.getItem('userInfo'));
        this.userName = this.userData.data.firstName;
        this.roleName = this.userData.data.roleName;
        this.roleId = parseInt(this.userData.data.userData.rank.role.roleCode)
        console.log(this.roleId)
        if (this.roleId === 1) {
            this.model = this.model.filter(f => f.access.includes('1'))
        } else if (this.roleId === 2) {
            this.model = this.model.filter(f => f.access.includes('2'))
        } else if (this.roleId === 3) {
            this.model = this.model.filter(f => f.access.includes('3'))
        } else if (this.roleId === 4) {
            this.model = this.model.filter(f => f.access.includes('4'))
        } else if (this.roleId === 5) {
            this.model = this.model.filter(f => f.access.includes('5'))
        } else if (this.roleId === 6) {
            this.model = this.model.filter(f => f.access.includes('6'))
        } else { }
        // else {
        //     this.model = this.model.filter(f => f.access.includes('5'))
        // }

    }

    logout() {
        this.router.navigate(['/']);
        sessionStorage.removeItem('userInfo');
    }
}