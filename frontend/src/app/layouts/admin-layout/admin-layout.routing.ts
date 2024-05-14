import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'user-profile', component: UserProfileComponent },
    { path: 'tables', component: TablesComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    {
        path: 'clients',
        loadChildren: () => import('src/app/pages/clients/clients.module').then(m => m.ClientsModule)
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
        path: 'executionservice',
        loadChildren: () => import('src/app/pages/burials/burials.module').then(m => m.BurialsModule)
    },
    {
        path: 'executionservice',
        loadChildren: () => import('src/app/pages/cremations/cremations.module').then(m => m.CremationsModule)
    },
    {
        path: 'executionservice',
        loadChildren: () => import('src/app/pages/relocations/relocations.module').then(m => m.RelocationsModule)
    }
];
