import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoBeatComponent } from './so-beat/so-beat.component';
import { SoDutyComponent } from './so-duty/so-duty.component';
import { SoHomeComponent } from './so-home/so-home.component';
import { SoLocationComponent } from './so-location/so-location.component';
import { SoTaskComponent } from './so-task/so-task.component';
import { SoUserActiveComponent } from './so-user-active/so-user-active.component';
import { SoUserInactiveComponent } from './so-user-inactive/so-user-inactive.component';
import { SoUserComponent } from './so-user/so-user.component';

const routes: Routes = [
  {
    path: '',
    component: SoHomeComponent
  },
  {
    path: 'beat',
    component: SoBeatComponent
  },
  {
    path: 'user',
    component: SoUserComponent
  },
  {
    path: 'userAct',
    component: SoUserActiveComponent
  },
  {
    path: 'userInact',
    component: SoUserInactiveComponent
  },
  {
    path: 'location',
    component: SoLocationComponent
  },
  {
    path: 'task',
    component: SoTaskComponent
  },
  {
    path: 'duty',
    component: SoDutyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoRoutingModule { }
