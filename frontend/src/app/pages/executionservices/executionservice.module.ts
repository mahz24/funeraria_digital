import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExecutionserviceRoutingModule } from './executionservice-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ExecutionserviceRoutingModule
  ]
})
export class ExecutionserviceModule { }
