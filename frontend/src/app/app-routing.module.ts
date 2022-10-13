import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { HomeComponent } from './home/home.component';
import { LobbyComponent } from './lobby/lobby.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent,
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'lobby', component: LobbyComponent, data: { lobbyId: 0 }
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
