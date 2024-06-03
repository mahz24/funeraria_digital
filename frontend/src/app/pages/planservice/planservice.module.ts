import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlanserviceRoutingModule } from './planservice-routing.module';
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
    PlanserviceRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PlanserviceModule { }
