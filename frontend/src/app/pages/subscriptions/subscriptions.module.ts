import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlanComponent } from './plan/plan.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
    PlanComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SubscriptionsModule { }
