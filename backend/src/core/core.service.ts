import { Injectable } from '@nestjs/common';
import { ValidPlay } from 'src/lobby-user/dto/lobby-user.dto';
import { LobbyUser } from 'src/lobby-user/entities/lobby-user.entity';
import { LobbyUserService } from 'src/lobby-user/lobby-user.service';
import { CreateCoreDto } from './dto/create-core.dto';
import { UpdateCoreDto } from './dto/update-core.dto';

@Injectable()
export class CoreService {

  constructor(private lobbyUserService: LobbyUserService) { }
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
    let lobbyUsersId: number[] = [];
    const lobbyUsers: LobbyUser[] = await this.lobbyUserService.findAllByLobby(lobbyId);
    for (let i = 0; i < lobbyUsers.length; i++) {
      if (lobbyUsers[i].validPlay === ValidPlay.ACCEPTED) {
        lobbyUsersId.push(lobbyUsers[i].id);
      }
      else {
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
    let result: number[] = [];
    while (lobbyUsersId.length > 0) {
      const random = Math.floor(Math.random() * lobbyUsersId.length);
      result.push(lobbyUsersId[random]);
      lobbyUsersId.splice(random, 1);
    }
    return result;
  }

  FirstLaunchDices(lobbyUserId: number): number[] {
    let dices: number[] = [];
    for (let i = 0; i < 5; i++) {
      dices.push(Math.floor(Math.random() * 6) + 1);
    }
    return dices;
  }

  SecondLaunchDices(lobbyUserId: number, dices: number[]): number[] {
    for (let i = 0; i < dices.length; i++) {
        dices[i] = Math.floor(Math.random() * 6) + 1;
      }
    return dices;
  }
}
