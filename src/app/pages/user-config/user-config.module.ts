import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UserConfigRoutingModule } from './user-config-routing.module';
import { RankListComponent } from './rank-list/rank-list.component';
import { RankFormComponent } from './rank-form/rank-form.component';
import { UserRegistrationListComponent } from './user-registration-list/user-registration-list.component';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component'; 
import { DepartmentFormComponent } from './department-form/department-form.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleListComponent } from './role-list/role-list.component';
import { RolePermissionFormComponent } from './role-permission-form/role-permission-form.component';
import { RolePermissionListComponent } from './role-permission-list/role-permission-list.component';
import { LoginDetailsComponent } from './login-details/login-details.component';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
@NgModule({
  declarations: [
    RoleFormComponent,
    RoleListComponent,
    RankListComponent,
    RankFormComponent,
    UserRegistrationListComponent,
    UserRegistrationFormComponent,
    DepartmentFormComponent,
    DepartmentListComponent,
    RolePermissionFormComponent,
    RolePermissionListComponent,
    LoginDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    PrimeModule,
    ReactiveFormsModule,
    UserConfigRoutingModule,
    MaterialModule
  ]
})
export class UserConfigModule { }
