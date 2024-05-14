import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CremationsRoutingModule } from './cremations-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    CremationsRoutingModule
  ]
})
export class CremationsModule { }
