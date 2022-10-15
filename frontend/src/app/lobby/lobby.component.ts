import { getLocaleNumberSymbol } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ILobby } from '../services/interfaces/i-lobby';
import { IUser } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';
import { IPlayer, ValidPlay } from '../services/interfaces/i-player';
import { ILobbyUser } from '../services/interfaces/i-lobby-user';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  lobbyId!: number;
  lobby!: ILobby;
  user!: IUser;
  isPlaying: boolean = false;


  constructor(private route: ActivatedRoute, private service: ServicesService, private router: Router, private dialog: MatDialog) { }

  async ngOnInit() {
    this.getParams();

    if (this.lobbyId === null || this.lobbyId === undefined || this.lobbyId === 0 || this.lobbyId === NaN) {
      this.openErrorDialog();
      this.router.navigate(['/home']);
    }
    else {
      let email = localStorage.getItem('email')
      if (email != null) {
        this.getUser(email)
        this.getLobby(this.lobbyId)
      }
      else {
        this.openErrorDialog();
        this.router.navigate(['/home']);
      }
    }
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.lobbyId = Number(params['lobbyId']);
    });
  }

  getLobby(lobbyId: number) {
    this.service.getLobby(lobbyId).toPromise().then((res: any) => {
      this.lobby = res[0];
      console.log("lobby => ", this.lobby);
    }).catch((err: Error) => {
      console.log(err);
      this.openErrorDialog();
      this.router.navigate(['/home']);
    });
  }

  getUser(email: string) {
    this.service.getUser(email).toPromise().then((res: any) => {
      this.user = res;
      console.log("User => ", this.user);
    }).catch((err: Error) => {
      console.log(err);
      this.openErrorDialog();
      this.router.navigate(['/home']);
    });
  }

  setPlay(lobbyUserId: number, play: boolean) {
    if (play) {
      this.isPlaying = true;
      this.service.setPlay(lobbyUserId, ValidPlay.ACCEPTED).toPromise().then((res: any) => {
        this.getLobby(this.lobbyId);
      }
      );
    }
    else {
      this.isPlaying = false;
      this.service.setPlay(lobbyUserId, ValidPlay.WAITING_PLAYING).toPromise().then((res: any) => {
        this.getLobby(this.lobbyId);
      });
    }
  }

  async startGame() {
    let UsersReadyToPlay: boolean = this.checkUsersIsPlaying(this.lobby.users)
    console.log("UsersReadyToPlay => ", UsersReadyToPlay);
    if (UsersReadyToPlay) {
      (await this.service.startGame(this.lobbyId)).toPromise().then((res: any) => {
        console.log("Game started => ", res);
        this.router.navigate(['/game', this.lobbyId]);
      }
      );

    }

  }

  checkUsersIsPlaying(users: IPlayer[]): boolean {
    let usersReadyToPlay: boolean = false;
    users.forEach(user => {
      if (user.validPlay == ValidPlay.ACCEPTED) {
        usersReadyToPlay = true;
      }
      else {
        usersReadyToPlay = false;
        return;
      }
    });
    return usersReadyToPlay;
  }

  deleteLobby() {
    this.service.deleteLobby(this.lobbyId).toPromise().then((res: any) => {
      console.log("Lobby deleted => ", res);
      this.router.navigate(['/home']);
    }).catch((err: Error) => {
      console.log(err);
      this.openErrorDialog();
      this.router.navigate(['/home']);
    });
  }

  leaveLobby() {
    if (this.user.id == this.lobby.owner.id) {
      this.deleteLobby();
    }
    else {
      let lobbyUserId = this.lobby.users.find((user: any) => user.user.id == this.user.id)?.id;
      console.log("lobbyUserId => ", lobbyUserId);

      if (lobbyUserId != null) {
        this.service.leaveLobby(lobbyUserId).toPromise().then((res: any) => {
          console.log("Lobby left => ", res);
          this.router.navigate(['/home']);
        }).catch((err: Error) => {
          console.log(err);
          this.openErrorDialog();
          this.router.navigate(['/home']);
        });
      }
    }
  }


  openErrorDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Error',
        message: 'Lobby not found',
        button: 'Ok'
      }
    });
  }
}