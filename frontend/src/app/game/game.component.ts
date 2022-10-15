import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ILobby } from '../services/interfaces/i-lobby';
import { IPlayer, ValidPlay } from '../services/interfaces/i-player';
import { IUser } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  lobbyId!: number;
  board: any;
  lobby!: ILobby;
  players: IPlayer[] = [];
  user!: IUser;
  me!: IPlayer;

  constructor(private route: ActivatedRoute, private service: ServicesService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getParams();
    this.getUser();
    this.getLobby(this.lobbyId);
  }

  getParams() {
    this.route.params.subscribe(params => {
      this.lobbyId = Number(params['lobbyId']);
    });
  }


  getLobby(lobbyId: number) {
    this.service.getLobby(lobbyId).toPromise().then((res: any) => {
      this.lobby = res[0];
      this.getPlayers(this.lobby);
    }).catch((err: Error) => {
      console.log("Erreur ==> ", err);
      this.openErrorDialog();
      //this.router.navigate(['/home']);
    });
  }

  getPlayers(lobby: ILobby) {
    lobby.users.forEach(user => {
      if (user.user.id === this.user.id) {
        this.me = user;
      }
      else {
        this.players.push(user);
      }
    });
  }

  getUser() {
    let email = localStorage.getItem('email')
    if (email != null) {
      this.service.getUser(email).toPromise().then((res: any) => {
        this.user = res;
      }).catch((err: Error) => {
        console.log(err);
        this.openErrorDialog();
        this.router.navigate(['/home']);
      });
    }
    else {
      this.openErrorDialog();
      this.router.navigate(['/home']);
    }
  }

  getLogo(validPlay: ValidPlay) {
    switch (validPlay) {
      case ValidPlay.PLAYING:
        return 'play_circle_outline';
      case ValidPlay.WAITING_TOUR:
        return 'pause_circle_outline';
      default:
        return 'pause_circle_outline';
    }
  }


  openErrorDialog() {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        button: 'OK'
      },
    });
  }

}
