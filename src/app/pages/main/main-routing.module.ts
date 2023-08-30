import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskComponent } from './task/task.component';
import { DutyComponent } from './duty/duty.component';
import { UserComponent } from './user/user.component';
import { AssetComponent } from './asset/asset.component';
import { DutyPointsComponent } from './duty-points/duty-points.component';

const routes: Routes = [
  {
    path: 'taskList',
    component: TaskComponent
  },
  {
    path: 'dutyList',
    component: DutyComponent
  },
  {
    path: 'userList',
    component: UserComponent
  },
  {
    path: 'assetList',
    component: AssetComponent
  },
  {
    path: 'dutyPoints',
    component: DutyPointsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
