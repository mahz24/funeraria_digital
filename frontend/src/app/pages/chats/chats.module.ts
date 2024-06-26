import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatsRoutingModule } from './chats-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './chat/chat.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class ChatsModule { }
