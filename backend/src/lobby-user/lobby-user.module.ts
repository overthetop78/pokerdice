import { Module } from '@nestjs/common';
import { LobbyUserService } from './lobby-user.service';
import { LobbyUserController } from './lobby-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbyUser } from './entities/lobby-user.entity';
import { Dice } from '../dices/entities/dice.entity';
import { DicesModule } from 'src/dices/dices.module';
import { DicesService } from 'src/dices/dices.service';

@Module({
  imports: [TypeOrmModule.forFeature([LobbyUser]), DicesModule],
  controllers: [LobbyUserController],
  providers: [LobbyUserService],
  exports: [LobbyUserService],
})
export class LobbyUserModule { }
