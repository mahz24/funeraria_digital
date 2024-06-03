import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutionserviceRoutingModule } from './executionservice-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ExecutionserviceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ExecutionserviceModule { }
