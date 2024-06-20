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
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/clients/clients.module').then(m => m.ClientsModule)
    }
    ,
    {
        path: 'plans',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/plan/plan.module').then(m => m.PlanModule)
    }
    ,
    {
        path: 'chats',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/chats/chats.module').then(m => m.ChatsModule)
    },
    {
        path: 'comments',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/comments/comments.module').then(m => m.CommentsModule)
    },
    {
        path: 'messages',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/messages/messages.module').then(m => m.MessagesModule)
    },
    {
        path: 'cremations',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: 'relocations',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/relocations/relocations.module').then(m => m.RelocationsModule)
    },
    {
        path: 'burials',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: 'executionservices',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/executionservices/executionservice.module').then(m => m.ExecutionserviceModule)
    },
    {
        path: 'cities',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/cities/cities.module').then(m => m.CitiesModule)
    },
    {
        path: 'departments',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/departments/departments.module').then(m => m.DepartmentsModule)
    },
    {
        path: 'rooms',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/rooms/rooms.module').then(m => m.RoomsModule)
    },
    {
        path: 'headquarters',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/headquarters/headquarters.module').then(m => m.HeadquartersModule)
    },
    {
        path: 'planservices',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/planservice/planservice.module').then(m => m.PlanserviceModule)
    },
    {
        path: 'services',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/services/services.module').then(m => m.ServicesModule)
    },
    {
        path: 'subscriptions',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/subscriptions/subscriptions.module').then(m=> m.SubscriptionsModule)
    },
    {
        path: 'bills',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/bills/bills.module').then(m=> m.BillsModule)
    },
    {
        path: 'admins',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/admins/admins.module').then(m=> m.AdminsModule)
    },
    {
        path: 'holders',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/holder/holder.module').then(m=> m.HolderModule)
    },
    {
        path: 'difuntos',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/difuntos/difuntos.module').then(m=> m.DifuntosModule)
    },
    {
        path: 'causa',
        canActivate:[AuthGuard],
        loadChildren: () => import('src/app/pages/causa/causa.module').then(m=> m.CausaModule)
    },
    {
        path: 'benefactors',
        loadChildren: () => import('src/app/pages/benefactor/benefactor.module').then(m=> m.BenefactorModule)
    },
    {
        path: 'checkout',
        loadChildren: () => import('src/app/pages/checkout/checkout.module').then(m => m.CheckoutModule)
      },

];
