import { Routes } from '@angular/router';
import { RegisterComponent } from './main/pages/authentication/register/register.component';
import { LoginComponent } from './main/pages/authentication/login/login.component';
import { AppdashboardComponent } from './main/pages/authentication/appdashboard/appdashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent ,
        title:"Login"
    },
    { path: 'register', component: RegisterComponent, title:"register" },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect empty path to login
    
    { path: 'appdashboard', component: AppdashboardComponent, title:"Dashboard" },
];
