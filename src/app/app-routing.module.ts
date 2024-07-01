import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { AppNotfoundComponent } from './pages/app.notfound.component';
import { AppErrorComponent } from './pages/app.error.component';
import { AppAccessdeniedComponent } from './pages/app.accessdenied.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthenticationGuard } from './authentication.guard';
const routes: Routes = [
    { path: '', redirectTo:"login", pathMatch:'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'main', component: AppMainComponent,canActivate:[AuthenticationGuard],
        children: [
            // { path: '', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'dashboard', loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'admin', loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) },
            { path: 'so', loadChildren: () => import('./pages/so/so.module').then(m => m.SoModule) },
            { path: 'master', loadChildren: () => import('./pages/master/master.module').then(m => m.MasterModule) },
            { path: 'performance', loadChildren: () => import('./pages/performance/performance.module').then(m => m.PerformanceModule) },
            { path: 'user-config', loadChildren: () => import('./pages/user-config/user-config.module').then(m => m.UserConfigModule) },
            { path: 'reports', loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule) },
            { path: 'lot', loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) },
            { path: 'task', loadChildren: () => import('./pages/task/task.module').then(m => m.TaskModule) },
            { path: 'duty', loadChildren: () => import('./pages/duty/duty.module').then(m => m.DutyModule) },
            { path: 'database', loadChildren: () => import('./pages/database/database.module').then(m => m.DatabaseModule)}

        ]
    },
    { path: 'error', component: AppErrorComponent },
    { path: 'access', component: AppAccessdeniedComponent },
    { path: 'notfound', component: AppNotfoundComponent },
    { path: '**', redirectTo: '/notfound' },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { useHash: false })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
