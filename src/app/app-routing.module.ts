import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchsComponent } from './matchs/matchs.component';
import { ParticipantsComponent } from './participants/participants.component';

export const routes: Routes = [
  {path: 'participants', component: ParticipantsComponent },

  {path: 'matchs', component: MatchsComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
