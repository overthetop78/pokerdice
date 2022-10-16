import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DialogComponent } from './dialog/dialog.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';


// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateLobbyComponent } from './create-lobby/create-lobby.component';
import { LobbyComponent } from './lobby/lobby.component';
import { LobbyPasswordComponent } from './lobby-password/lobby-password.component';
import { GameComponent } from './game/game.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';




const materialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSelectModule,
  MatGridListModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatCommonModule,
];

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        RegisterComponent,
        DialogComponent,
        CreateLobbyComponent,
        LobbyComponent,
        LobbyPasswordComponent,
        GameComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ...materialComponents,
        FontAwesomeModule,
    ],
    providers: [{ provide: 'HTTP_INTERCEPTOR', useClass: AuthInterceptor, multi: true },],
    bootstrap: [AppComponent]
})
export class AppModule { }
