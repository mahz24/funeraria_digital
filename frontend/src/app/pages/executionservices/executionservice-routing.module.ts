import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {
    path: "list",
    component: ListComponent
  },
  {
    path: "create",
    component: ManageComponent
  },
  {
    path: "update/:id",
    component: ManageComponent
  },
  {
    path:"view/:id",
    component:ManageComponent
  },
  {
    path: "list/client/:id",
    component: ListComponent
  },
  {
    path: "list/service/:id",
    component: ListComponent
  },
  {
    path: "create/client/:id",
    component: ServiceComponent
  },
  {
    path: "create/service/:id",
    component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExecutionserviceRoutingModule { }
