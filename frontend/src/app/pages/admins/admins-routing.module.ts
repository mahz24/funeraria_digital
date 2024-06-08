import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { UserComponent } from './user/user.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
    path: "list",
    component:ListComponent
  },
  {
    path:"create",
    component:UserComponent,
  },
  {
    path:"create/:id",
    component: ManageComponent
  },
  {
    path:"update/:id",
    component: ManageComponent
  },
  {
    path:"view/:id",
    component:ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminsRoutingModule { }
