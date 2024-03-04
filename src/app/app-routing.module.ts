import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TixbankComponent } from './tixbank/tixbank.component';
import { MasterComponent } from './master/master.component';
import { ProxiesComponent } from './proxies/proxies.component';

export const routes: Routes = [
  {path: 'tixbank', component: TixbankComponent },

  {path: 'proxies', component: ProxiesComponent },

  {path: 'master', component: MasterComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
