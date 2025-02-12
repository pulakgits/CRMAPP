import { Routes } from '@angular/router';
import { RegisterComponent } from './main/pages/authentication/register/register.component';
import { LoginComponent } from './main/pages/authentication/login/login.component';
import { UserComponent } from './main/pages/appdashboard/user/user.component';
import { SettingComponent } from './main/pages/appdashboard/setting/setting/setting.component';
import { AppdashboardComponent } from './main/pages/appdashboard/appdashboard.component';
import { HomeComponent } from './main/pages/appdashboard/home/home.component';
import { AnalyticsComponent } from './main/pages/appdashboard/analytics/analytics/analytics.component';
import { DashboardComponent } from './main/pages/appdashboard/home/dashboard/dashboard.component';
import { UserlistComponent } from './main/pages/appdashboard/user/userlist/userlist.component';



export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'register', component: RegisterComponent, title: 'Register' },
    { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect empty path to login
    { path: 'appdashboard', component: AppdashboardComponent, title: 'Dashboard',
        children: [
            { path: 'home', component: HomeComponent, title: 'Home',
            },
            { path: 'user', component: UserlistComponent, title: 'User' },
            { path: 'analytics', component: AnalyticsComponent, title: 'Analytics' },
            { path: 'setting', component: SettingComponent, title: 'Setting' }
        ]
    }
];