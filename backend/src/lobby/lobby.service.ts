import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoreResultDto } from '../core/dto/core-result.dto';
import { CreateLobbyDto } from './dto/create-lobby.dto';
import { UpdateLobbyDto } from './dto/update-lobby.dto';
import { Lobby } from './entities/lobby.entity';

@Injectable()
export class LobbyService {

  constructor(
    @InjectRepository(Lobby)
    private lobbyRepository: Repository<Lobby>,
  ) { }

  async create(createLobbyDto: CreateLobbyDto) {
    try {
      const lobby = await this.lobbyRepository.save(createLobbyDto);
      return lobby;
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const lobbies = await this.lobbyRepository.find({
        relations: ['owner', 'users'],
      });
      return lobbies;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const lobby: Lobby[] = await this.lobbyRepository.find({
        relations: ['owner', 'users'],
        where: { id: id },
      });
      return lobby;
    } catch (error) {
      return error;
    }
  }

  async update(id: number, updateLobbyDto: UpdateLobbyDto) {
    const lobby = this.lobbyRepository.find({
      relations: ['owner', 'users'],
      where: { id: id },
    });
    const updatedLobby = Object.assign(await lobby, updateLobbyDto);
    console.log('update : ', updatedLobby);

    return this.lobbyRepository.save(updatedLobby);
  }

  async remove(id: number) {
    const lobby = this.lobbyRepository.find({
      relations: ['owner', 'users'],
      where: { id: id },
    });
    return this.lobbyRepository.remove(await lobby);
  }

  async findLobbyForResult(lobbyId: number): Promise<CoreResultDto> {
    const lobby = await this.lobbyRepository.createQueryBuilder('lobby')
      .leftJoinAndSelect('lobby.users', 'users')
      .leftJoinAndSelect('users.user', 'user')
      .where('lobby.id = :lobbyId', { lobbyId: lobbyId })
      .getOne();
    return lobby;
  }
}
