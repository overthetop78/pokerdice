import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MyDice } from '../core/core.service';
import { Repository } from 'typeorm';
import { DiceDto } from './dto/dice.dto';
import { UpdateDiceDto } from './dto/update-dice.dto';
import { Dice } from './entities/dice.entity';

@Injectable()
export class DicesService {

  constructor(
    @InjectRepository(Dice)
    private diceRepository: Repository<Dice>
  ) { }

  create(createDiceDto: DiceDto) {
    return this.diceRepository.save(createDiceDto);
  }

  findAll() {
    return `This action returns all dices`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dice`;
  }

  update(id: number, updateDiceDto: UpdateDiceDto) {
    return `This action updates a #${id} dice`;
  }

  remove(id: number) {
    return `This action removes a #${id} dice`;
  }

  async findOneByLobbyUserId(lobbyUserId: number): Promise<Dice> {
    return await this.diceRepository.findOne({
      where: { lobbyUser: { id: lobbyUserId } },
    });
  }

  async findAllByLobbyUserId(lobbyUserId: number): Promise<Dice[]> {
    return await this.diceRepository.find({
      where: { lobbyUser: { id: lobbyUserId } },
    });
  }
}
