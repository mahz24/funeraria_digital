import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { Fa2Component } from 'src/app/pages/fa2/fa2.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { PetitionComponent } from 'src/app/pages/petition/petition.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: '2fa/:id',        component: Fa2Component},
    { path: 'profile/:id',    component: ProfileComponent},
    { path: 'petition',       component: PetitionComponent}
];
