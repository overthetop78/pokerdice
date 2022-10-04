import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { LobbyUserModule } from '../lobby-user/lobby-user.module';
import { DicesModule } from '../dices/dices.module';
import { Core } from './core';
import { LobbyModule } from '../lobby/lobby.module';

@Module({
  imports: [LobbyUserModule, DicesModule, LobbyModule],
  controllers: [CoreController],
  providers: [CoreService, Core],
  exports: [CoreService],
})
export class CoreModule { }
