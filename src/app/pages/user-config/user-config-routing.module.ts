import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RankFormComponent } from './rank-form/rank-form.component';
import { RankListComponent } from './rank-list/rank-list.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { UserRegistrationListComponent } from './user-registration-list/user-registration-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RoleFormComponent } from './role-form/role-form.component';
import { RolePermissionFormComponent } from './role-permission-form/role-permission-form.component';
import { RolePermissionListComponent } from './role-permission-list/role-permission-list.component';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { AccesscontrolFormComponent } from './accesscontrol-form/accesscontrol-form.component';
import { AccesscontrolListComponent } from './accesscontrol-list/accesscontrol-list.component';

const routes: Routes = [
  {
    path:'department-form',
    component:DepartmentFormComponent
  },
  {
    path:'department-list',
    component:DepartmentListComponent
  },
  {
    path:'user-list',
    component:UserRegistrationListComponent
  },
  {
    path:'user/:status',
    component:LoginDetailsComponent
  },
  {
    path:'user-form',
    component:UserRegistrationFormComponent
  },
  {
    path:'user-form/:userId',
    component:UserRegistrationFormComponent
  },
  {
    path: 'role-permission-form',
    component: RolePermissionFormComponent
  },
  {
    path: 'role-permission-list',
    component: RolePermissionListComponent
  },
  {
    path: 'accesscontrol-list',
    component: AccesscontrolListComponent
  },
  {
    path: 'accesscontrol-form/:accessControlId',
    component: AccesscontrolFormComponent
  },
  {
    path: 'accesscontrol-form',
    component: AccesscontrolFormComponent
  },
  {
    path: 'rank-list',
    component: RankListComponent
  },
  {
    path: 'rank-form/:rankId',
    component: RankFormComponent
  },
  {
    path: 'rank-form',
    component: RankFormComponent
  },
  {
    path: 'role-list',
    component: RoleListComponent
  },
  {
    path: 'role-form/:roleId',
    component: RoleFormComponent
  },
  {
    path: 'role-form',
    component: RoleFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserConfigRoutingModule { }
