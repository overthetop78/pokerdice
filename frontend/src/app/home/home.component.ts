import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators, ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreateLobbyComponent } from '../create-lobby/create-lobby.component';
import { LobbyPasswordComponent } from '../lobby-password/lobby-password.component';
import { ILobby } from '../services/interfaces/i-lobby';
import { ValidPlay } from '../services/interfaces/i-player';
import { IUser, UserRole } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private fb: UntypedFormBuilder, private service: ServicesService, private router: Router, private dialog: MatDialog) { }

  isConnected = false;
  isAwaitToPlayer = false;
  userInGame: boolean = false;

  user: IUser = {
    username: '',
    email: '',
    password: '',
    role: UserRole.USER,
    birthday: new Date(),
    createdAt: new Date(),
    updatedAt: new Date(),
    id: 0
  };

  lobbies: ILobby[] = [];

  lobbyInfo: ILobby = {
    id: 0,
    name: '',
    password: '',
    owner: {
      id: 0,
      username: '',
    },
    users: []
  }


  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });


  ngOnInit(): void {
    if (localStorage.getItem('access-token')) {
      this.isConnected = true;
      let email = localStorage.getItem('email')
      if (email != null) {
        this.GetUser(email)
        this.getLobbies();
      }
    }
  }

  GetUser(email: string): IUser {
    this.service.getUser(email).toPromise().then(async (res: any) => {
      this.user = await res;
    });
    return this.user;
  }

  Register() {
    this.router.navigate(['register'])
  }


  logout() {
    localStorage.removeItem('access-token')
    localStorage.removeItem('email')
    this.isConnected = false;
    this.router.navigate(['home'])
  }

  getLobbies() {
    this.service.getLobbies().toPromise().then(async (res: any) => {
      this.lobbies = await res;
      console.log(this.lobbies);
      this.userInGame = this.GetUserInGame(this.lobbies);

    });
  }

  getLobby(lobby: ILobby) {
    this.lobbyInfo = {
      id: lobby.id,
      name: lobby.name,
      password: lobby.password,
      owner: {
        id: lobby.owner.id,
        username: lobby.owner.username,
      },
      users: lobby.users
    }
    if (this.lobbyInfo.users.length != 0) {
      let isPlayer = false;
      this.lobbyInfo.users.forEach(user => {
        if (!isPlayer) {
          if (user.validPlay != ValidPlay.ACCEPTED && user.validPlay != ValidPlay.WAITING_PLAYING) {
            this.isAwaitToPlayer = false;
            isPlayer = true;
          }
          else {
            this.isAwaitToPlayer = true;
          }
        }
      });
    }
    else {
      this.isAwaitToPlayer = true;
    }

  }

  CreateLobby() {
    this.dialog.open(CreateLobbyComponent, {

    });
    this.dialog.afterAllClosed.subscribe(() => {
      this.getLobbies();
    }
    );
  }

  joinLobby(lobbyId: number, lobbyPassword: string | null) {
    if (lobbyPassword != null) {
      this.dialog.open(LobbyPasswordComponent, {
        data: {
          lobbyId: lobbyId,
          lobbyPassword: lobbyPassword
        }
      });
      this.dialog.afterAllClosed.subscribe(() => {
        if (this.checkLobbyPassword(lobbyPassword)) {
          let lobby = this.lobbies.find(lobby => lobby.id == lobbyId);
          if (lobby != undefined) {
            this.service.addUserToLobby(this.user, lobby).subscribe((res: any) => {
              this.router.navigate(['lobby', lobbyId]);
            });
          }
        }
      });
    }
    else {
      let lobby = this.lobbies.find(lobby => lobby.id == lobbyId);
      if (lobby != undefined) {
        this.service.addUserToLobby(this.user, lobby).subscribe((res: any) => {
          this.router.navigate(['lobby', lobbyId]);
        });
      }
    }
  }

  checkLobbyPassword(lobbyPassword: string): Boolean {
    if (lobbyPassword == this.lobbyInfo.password) {
      return true;
    }
    return false;
  }

  Login() {
    console.log(this.loginForm.value);
    if (this.loginForm.value) {
      let connection = this.loginForm.value;
      this.service.login(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('access-token', res.access_token);
        localStorage.setItem('email', res.email);
        this.isConnected = true;
        this.user = this.GetUser(res.email);
        this.getLobbies();
      });
    }
  }

  GetUserInGame(lobbies: ILobby[]): boolean {
    let userInGame = false;
    lobbies.forEach(lobby => {
      if (!userInGame) {
        lobby.users.forEach(user => {
          if (!userInGame) {
            if (user.user.id == this.user.id) {
              userInGame = true;
              if (user.validPlay == ValidPlay.ACCEPTED || user.validPlay == ValidPlay.WAITING_PLAYING) {
                this.router.navigate(['lobby', lobby.id]);
              }
              else if (user.validPlay == ValidPlay.WAITING_TOUR || user.validPlay == ValidPlay.PLAYING) {
                this.router.navigate(['game', lobby.id]);
              }
            }
          }
        });
      }
    });

    return userInGame;
  }

}
