import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeModule } from 'src/app/shared/modules/prime/prime.module'; 
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material/material.module';
import { TaskRoutingModule } from './task-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TaskRoutingModule,
    PrimeModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule
  ]
})
export class TaskModule { }
