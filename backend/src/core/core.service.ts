import { Injectable } from '@nestjs/common';
import { CreateDiceDto } from '../dices/dto/create-dice.dto';
import { Dice } from '../dices/entities/dice.entity';
import { DicesService } from '../dices/dices.service';
import { DiceDto } from '../dices/dto/dice.dto';
import { ValidPlay } from '../lobby-user/dto/lobby-user.dto';
import { LobbyUser } from '../lobby-user/entities/lobby-user.entity';
import { LobbyUserService } from '../lobby-user/lobby-user.service';
import { Core, UserResult } from './core';
import { CreateCoreDto } from './dto/create-core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';
import { CoreResultDto } from './dto/core-result.dto';
import { LobbyService } from '../lobby/lobby.service';

export class MyDice {
  diceId: number;
  value: number;
  isLocked: boolean;
  lobbyUserId: number;
}

@Injectable()
export class CoreService {

  dices: DiceDto[] = [];

  myDices: { lobbyUserId: number, diceId: number, value: number, isLocked: boolean }[] = [];

  constructor(
    private lobbyUserService: LobbyUserService,
    private dicesService: DicesService,
    private lobbyService: LobbyService,
    private core: Core,
  ) { }

  create(createCoreDto: CreateCoreDto) {
    return 'This action adds a new core';
  }

  findAll() {
    return `This action returns all core`;
  }

  findOne(id: number) {
    return `This action returns a #${id} core`;
  }

  update(id: number, updateCoreDto: UpdateCoreDto) {
    return `This action updates a #${id} core`;
  }

  remove(id: number) {
    return `This action removes a #${id} core`;
  }

  /**
   * @description Check if the game can be started
   * @param lobbyId Identifiant du Lobby
   * @returns lobbyUserId liste des identifiants des joueurs du lobby si tous les joueurs ont 'ACCEPTED' sinon renvoi false)
   */
  async CheckRunGame(lobbyId: number): Promise<number[] | boolean> {
    const lobbyUsersId: number[] = [];
    const lobbyUsers: LobbyUser[] = await this.lobbyUserService.findAllByLobby(
      lobbyId,
    );
    for (let i = 0; i < lobbyUsers.length; i++) {
      if (lobbyUsers[i].validPlay === ValidPlay.ACCEPTED) {
        lobbyUsersId.push(lobbyUsers[i].id);
      } else {
        return false;
      }
    }
    return lobbyUsersId;
  }

  /**
   * @description Liste la position des joueurs pour la partie
   * @param lobbyUsersId Identifiant des joueurs du lobby
   * @returns liste des identifiants des joueurs du lobby dans un ordre aléatoire
   */
  RandomListPlayer(lobbyUsersId: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    while (lobbyUsersId.length > 0) {
      i++;
      const random = Math.floor(Math.random() * lobbyUsersId.length);
      result.push(lobbyUsersId[random]);
      if (result[0] === lobbyUsersId[random]) {
        this.lobbyUserService.update(lobbyUsersId[random], { position: i, validPlay: ValidPlay.PLAYING });
      }
      else {
        this.lobbyUserService.update(lobbyUsersId[random], { position: i, validPlay: ValidPlay.WAITING_TOUR });
      }
      lobbyUsersId.splice(random, 1);
    }
    return result;
  }

  /**
   * @description Lance les dés
   * @param lobbyUserId Identifiant du joueur
   * @returns liste des dés du joueur
   */
  async FirstLaunchDices(lobbyUserId: number): Promise<MyDice[]> {
    this.dices = [];
    this.myDices = [];
    const LobbyUser = await this.lobbyUserService.findOne(lobbyUserId)
    for (let i = 0; i < 5; i++) {
      this.dices.push({ lobbyUser: LobbyUser, diceId: i, value: Math.floor(Math.random() * 6) + 1, isLocked: false });
      this.myDices.push({ lobbyUserId: LobbyUser.id, diceId: i, value: this.dices[i].value, isLocked: false });
    }
    return this.myDices;
  }

  /**
   * @description Verrouille ou déverrouille un dé
   * @param lobbyUserId Identifiant du joueur
   * @param diceId Identifiant du dé
   * @param isLocked Verrouillage du dé
   * @returns liste des dés du joueur
   */
  async updateDices(lobbyUserId: number, diceId: number, isLocked: boolean): Promise<MyDice[]> {
    const LobbyUser = await this.lobbyUserService.findOne(lobbyUserId);
    if (isLocked) {
      this.dices[diceId].isLocked = isLocked;
      this.myDices[diceId].isLocked = isLocked;
    } else {
      this.dices[diceId].isLocked = !isLocked;
      this.myDices[diceId].isLocked = !isLocked;
    }
    return this.myDices;
  }

  /**
   * @description Lance les dés avec les valeurs précédentes si elles ne sont pas verrouillées
   * @param lobbyUserId Identifiant du joueur
   * @returns liste des dés du joueur
   */
  async SecondLaunchDices(lobbyUserId: number): Promise<LobbyUser> {
    const Dices = await this.dicesService.findOneByLobbyUserId(lobbyUserId);
    for (let i = 0; i < this.dices.length; i++) {
      if (!this.dices[i].isLocked) {
        this.dices[i].value = Math.floor(Math.random() * 6) + 1;
        this.dicesService.create(this.dices[i]);
      }
    }
    return await this.lobbyUserService.findOne(lobbyUserId);
  }



  async CalculateScore(lobbyId: number): Promise<UserResult[] | UserResult> {
    const lobby: CoreResultDto = await this.lobbyService.findLobbyForResult(lobbyId);
    return this.core.CalculateScore(lobby);
  }
}
