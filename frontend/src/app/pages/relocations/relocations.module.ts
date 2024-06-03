import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RelocationsRoutingModule } from './relocations-routing.module';
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
    RelocationsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RelocationsModule { }
