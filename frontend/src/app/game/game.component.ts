import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { ILobby } from '../services/interfaces/i-lobby';
import { IPlayer, ValidPlay } from '../services/interfaces/i-player';
import { IUser } from '../services/interfaces/i-user';
import { ServicesService } from '../services/services.service';
// Font Awesome
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix, faDice, IconPrefix } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconName } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { IDice } from '../services/interfaces/i-dice';
import { IUserResult } from '../services/interfaces/i-user-result';
import { ValueName } from '../services/interfaces/value-name.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', './game2.component.css']
})
export class GameComponent implements OnInit {

  //Font Awesome
  faDiceOne = faDiceOne;
  faDiceTwo = faDiceTwo;
  faDiceThree = faDiceThree;
  faDiceFour = faDiceFour;
  faDiceFive = faDiceFive;
  faDiceSix = faDiceSix;
  faDice = faDice;

  lobbyId!: number;
  board: any;
  lobby!: ILobby;
  players: IPlayer[] = [];
  user!: IUser;
  me!: IPlayer;
  result: IUserResult = {
    idLobbyUser: 0,
    result: ValueName.NULL
  }

  secondLaunch: boolean = false;
  isPlaying: boolean = false;

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
      user.dices = [];
      if (user.user.id === this.user.id) {
        this.me = user;
        console.log(this.me);
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
        this.isPlaying = true;
        return 'play_circle_outline';
      case ValidPlay.WAITING_TOUR:
        this.isPlaying = false;
        return 'pause_circle_outline';
      default:
        return 'pause_circle_outline';
    }
  }

  getDice(dice: any): IconDefinition {
    switch (dice.value) {
      case 1:
        return faDiceOne;
      case 2:
        return faDiceTwo;
      case 3:
        return faDiceThree;
      case 4:
        return faDiceFour;
      case 5:
        return faDiceFive;
      case 6:
        return faDiceSix;
      default:
        return faDice;
    }
  }

  switchDice(dice: IDice): boolean {
    if (dice.isLocked) {
      dice.isLocked = false;
      this.service.lockDice(dice).toPromise().then((res: any) => {
      }).catch((err: Error) => {
        console.log(err);
        this.openErrorDialog();
      });
      return false;
    }
    else {
      dice.isLocked = true;
      this.service.lockDice(dice).toPromise().then((res: any) => {
      }).catch((err: Error) => {
        console.log(err);
        this.openErrorDialog();
      });
      return true;
    }
  }

  DiceState(isLocked: boolean): string {
    if (isLocked) {
      return 'locked';
    }
    else {
      return 'unlocked';
    }
  }

  rollDices() {
    if (!this.secondLaunch) {
      this.service.rollDices(this.me, false).toPromise().then(async (res: any) => {
        console.log("Dices rolled", res);
        this.me.dices = res;
        this.secondLaunch = true;
        this.result = await this.getResultDices(this.me.id, this.me.dices);
      }).catch((err: Error) => {
        console.log(err);
        this.openErrorDialog();
      });
    }
    else {
      this.service.rollDices(this.me, true).toPromise().then(async (res: any) => {
        console.log("Dices rolled", res);
        this.me.dices = res;
        this.secondLaunch = false;
        this.result = await this.getResultDices(this.me.id, this.me.dices);
        this.NextPlayer(this.lobby);
      }).catch((err: Error) => {
        console.log(err);
        this.openErrorDialog();
      });
    }
  }

  async getResultDices(lobbyUserId: number, dices: IDice[]): Promise<IUserResult> {
    return await this.service.getResultDices(lobbyUserId, dices).toPromise().then(async (res: any) => {
      return await res;
    }
    ).catch((err: Error) => {
      console.log(err);
      this.openErrorDialog();
      return null;
    }
    );
  }

  getResultName(result: IUserResult): string {
    switch (result.result) {
      case ValueName.NULL:
        return 'Aucun';
      case ValueName.BRELAN:
        return 'Brelan' + ' de ' + result.brelan;
      case ValueName.CARRE:
        return 'Carré' + ' de ' + result.carre;
      case ValueName.FULL:
        return 'Full' + ' de ' + result.brelan + ' aux ' + result.paire1;
      case ValueName.PETITE_SUITE:
        return 'Petite suite' + ' de ' + result.petiteSuite;
      case ValueName.GRANDE_SUITE:
        return 'Grande suite' + ' de ' + result.grandeSuite;
      case ValueName.DOUBLE_PAIRE:
        return 'Double paire' + ' de ' + result.paire1 + ' et ' + result.paire2;
      case ValueName.PAIRE:
        return 'Paire' + ' de ' + result.paire1;
      case ValueName.QUINTE:
        return 'Quinte' + ' de ' + result.quinte;
      default:
        return 'Aucun';
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

  GetFirstPlayer(lobby: ILobby) {
    // TODO : Trouver le premier joueur

  }

  NextPlayer(lobby: ILobby) {
    console.log("Next player", lobby);
    console.log("Next player", this.me);

    //Mettre le User en attente
    this.me.tour += 1;
    this.me.validPlay = ValidPlay.WAITING_TOUR;
    this.service.patchLobbyUser(this.me.id, this.me).toPromise().then((res: any) => {
      console.log("User updated", res);
    }).catch((err: Error) => {
      console.log(err);
      this.openErrorDialog();
    });

    //Rechercher le prochain joueur qui peut jouer
    //Mettre le prochain User en en train de jouer
    lobby.users.forEach(user => {
      if (user.tour < this.me.tour && user.validPlay == ValidPlay.WAITING_TOUR && user.position == this.me.position + 1) {
        user.validPlay = ValidPlay.PLAYING;
        this.service.patchLobbyUser(user.id, user).toPromise().then((res: any) => {
          console.log("User updated", res);
        }
        ).catch((err: Error) => {
          console.log(err);
          this.openErrorDialog();
        }
        );
      }
      else if (user.tour >= this.me.tour && user.validPlay == ValidPlay.WAITING_TOUR && user.position == 1) {
        user.validPlay = ValidPlay.PLAYING;
        this.service.patchLobbyUser(user.id, user).toPromise().then((res: any) => {
          console.log("User updated", res);
        }
        ).catch((err: Error) => {
          console.log(err);
          this.openErrorDialog();
        }
        );
      }

    });
  }

}
