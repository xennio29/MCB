import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TixbankComponent } from './tixbank/tixbank.component';
import { MasterComponent } from './master/master.component';
import { ProxiesComponent } from './proxies/proxies.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AdminGuard } from './core/auth.guard';
import { ReportsComponent } from './reports/reports.component';

export const routes: Routes = [
  {path: 'tixbank', component: TixbankComponent },

  {path: 'proxies', component: ProxiesComponent },

  {path: 'masters', component: MasterComponent },
  {path: 'login', component: LoginComponent },
  {path: 'register', component: RegisterComponent },
  {path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard] },
  {path: 'reports', component: ReportsComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
