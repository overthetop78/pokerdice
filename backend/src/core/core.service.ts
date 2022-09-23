import { Injectable } from '@nestjs/common';
import { CreateDiceDto } from 'src/dices/dto/create-dice.dto';
import { Dice } from 'src/dices/entities/dice.entity';
import { DicesService } from '../dices/dices.service';
import { DiceDto } from '../dices/dto/dice.dto';
import { ValidPlay } from '../lobby-user/dto/lobby-user.dto';
import { LobbyUser } from '../lobby-user/entities/lobby-user.entity';
import { LobbyUserService } from '../lobby-user/lobby-user.service';
import { CreateCoreDto } from './dto/create-core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';

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
   *
   * @param lobbyUsersId Identifiant des joueurs du lobby
   * @returns liste des identifiants des joueurs du lobby dans un ordre aléatoire
   */
  RandomListPlayer(lobbyUsersId: number[]): number[] {
    const result: number[] = [];
    while (lobbyUsersId.length > 0) {
      const random = Math.floor(Math.random() * lobbyUsersId.length);
      result.push(lobbyUsersId[random]);
      if (result[0] === lobbyUsersId[random]) {
        this.lobbyUserService.update(lobbyUsersId[random], { validPlay: ValidPlay.PLAYING });
      }
      else {
        this.lobbyUserService.update(lobbyUsersId[random], { validPlay: ValidPlay.WAITING_TOUR });
      }
      lobbyUsersId.splice(random, 1);
    }
    return result;
  }

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

  async SecondLaunchDices(lobbyUserId: number): Promise<DiceDto[]> {
    const Dices = await this.dicesService.findOneByLobbyUserId(lobbyUserId);
    for (let i = 0; i < this.dices.length; i++) {
      if (!this.dices[i].isLocked) {
        this.dices[i].value = Math.floor(Math.random() * 6) + 1;
        this.dicesService.create(this.dices[i]);
      }
    }
    return this.dices;
  }
}
