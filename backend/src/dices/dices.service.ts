import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDiceDto } from './dto/create-dice.dto';
import { UpdateDiceDto } from './dto/update-dice.dto';
import { Dice } from './entities/dice.entity';

@Injectable()
export class DicesService {

  constructor(
    @InjectRepository(Dice)
    private diceRepository: Repository<Dice>,
  ) {}

  create(createDiceDto: CreateDiceDto) {
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
}
