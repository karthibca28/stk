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
    path:'rank-form',
    component:RankFormComponent
  },
  {
    path:'rank-list',
    component:RankListComponent
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
    path: 'role-form',
    component: RoleFormComponent
  },
  {
    path: 'role-list',
    component: RoleListComponent
  },
  {
    path: 'role-permission-form',
    component: RolePermissionFormComponent
  },
  {
    path: 'role-permission-list',
    component: RolePermissionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserConfigRoutingModule { }
