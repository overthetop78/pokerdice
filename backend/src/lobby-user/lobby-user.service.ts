import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResult } from 'src/core/core';
import { CoreResultDto } from 'src/core/dto/core-result.dto';
import { Repository } from 'typeorm';
import { CreateLobbyUserDto } from './dto/create-lobby-user.dto';
import { ValidPlay } from './dto/lobby-user.dto';
import { UpdateLobbyUserDto } from './dto/update-lobby-user.dto';
import { LobbyUser } from './entities/lobby-user.entity';

@Injectable()
export class LobbyUserService {

  constructor(
    @InjectRepository(LobbyUser)
    private lobbyUserRepository: Repository<LobbyUser>,
  ) { }

  async create(createLobbyUserDto: CreateLobbyUserDto) {
    try {
      const lobbyUser = await this.lobbyUserRepository.save(createLobbyUserDto);
      return lobbyUser;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const lobbyUsers = await this.lobbyUserRepository.find({
        relations: ['user', 'lobby'],
      });
      return lobbyUsers;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number): Promise<LobbyUser> {
    try {
      const lobbyUser = await this.lobbyUserRepository.findOne({
        relations: ['user'],
        where: { id: id },
      });
      return lobbyUser;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateLobbyUserDto: UpdateLobbyUserDto) {
    const lobbyUser = await this.lobbyUserRepository.findOne({
      relations: ['user', 'lobby'],
      where: { id: id },
    });
    const updatedLobbyUser = Object.assign(lobbyUser, updateLobbyUserDto);
    return this.lobbyUserRepository.save(updatedLobbyUser);
  }

  async remove(id: number) {
    try {
      const lobbyUser = await this.lobbyUserRepository.find({
        relations: ['user', 'lobby'],
        where: { id: id },
      });
      return this.lobbyUserRepository.remove(lobbyUser);
    } catch (error) {
      return error;
    }
  }

  findAllByLobby(idLobby: number): PromiseLike<LobbyUser[]> {
    return this.lobbyUserRepository.find({
      relations: ['user', 'lobby'],
      where: { lobby: { id: idLobby } },
    });
  }

  /**
   * 
   * @param idLobbyUser Identifiant du lobbyUser
   * @param validPlay Enumérateur ValidPlay (ACCEPTED, WAITING_TOUR, WAITING_PLAYING, PLAYING, FINISHED)
   * @returns lobbyUser mis à jour
   */
  async updateValidPlay(idLobbyUser: number, validPlay: ValidPlay) {
    return await this.lobbyUserRepository.update(idLobbyUser, { validPlay: validPlay });
  }
}
