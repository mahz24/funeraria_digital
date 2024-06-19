import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', canActivate:[AuthGuard],component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    {
        path: 'clients',
        loadChildren: () => import('src/app/pages/clients/clients.module').then(m => m.ClientsModule)
    }
    ,
    {
        path: 'plans',
        loadChildren: () => import('src/app/pages/plan/plan.module').then(m => m.PlanModule)
    }
    ,
    {
        path: 'chats',
        loadChildren: () => import('src/app/pages/chats/chats.module').then(m => m.ChatsModule)
    },
    {
        path: 'comments',
        loadChildren: () => import('src/app/pages/comments/comments.module').then(m => m.CommentsModule)
    },
    {
        path: 'messages',
        loadChildren: () => import('src/app/pages/messages/messages.module').then(m => m.MessagesModule)
    },
    {
        path: 'cremations',
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: 'relocations',
        loadChildren: () => import('src/app/pages/relocations/relocations.module').then(m => m.RelocationsModule)
    },
    {
        path: 'burials',
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: 'executionservices',
        loadChildren: () => import('src/app/pages/executionservices/executionservice.module').then(m => m.ExecutionserviceModule)
    },
    {
        path: 'cities',
        loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)
    },
    {
        path: 'departments',
        loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
    },
    {
        path: 'rooms',
        loadChildren: () => import('src/app/pages/rooms/rooms.module').then(m => m.RoomsModule)
    },
    {
        path: 'headquarters',
        loadChildren: () => import('src/app/pages/headquarters/headquarters.module').then(m => m.HeadquartersModule)
    },
    {
        path: 'planservices',
        loadChildren: () => import('src/app/pages/planservice/planservice.module').then(m => m.PlanserviceModule)
    },
    {
        path: 'services',
        loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
        path: 'subscriptions',
        loadChildren: () => import('src/app/pages/subscriptions/subscriptions.module').then(m=> m.SubscriptionsModule)
    },
    {
        path: 'bills',
        loadChildren: () => import('src/app/pages/bills/bills.module').then(m=> m.BillsModule)
    },
    {
        path: 'admins',
        loadChildren: () => import('src/app/pages/admins/admins.module').then(m=> m.AdminsModule)
    },
    {
        path: 'holders',
        loadChildren: () => import('src/app/pages/holder/holder.module').then(m=> m.HolderModule)
    },
    {
        path: 'difuntos',
        loadChildren: () => import('src/app/pages/difuntos/difuntos.module').then(m=> m.DifuntosModule)
    },
    {
        path: 'causa',
        loadChildren: () => import('src/app/pages/causa/causa.module').then(m=> m.CausaModule)
    },
    {
        path: 'benefactors',
        loadChildren: () => import('src/app/pages/benefactor/benefactor.module').then(m=> m.BenefactorModule)
    },

];
