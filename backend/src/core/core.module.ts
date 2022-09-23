import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { LobbyUserModule } from '../lobby-user/lobby-user.module';
import { DicesModule } from 'src/dices/dices.module';

@Module({
  imports: [LobbyUserModule, DicesModule],
  controllers: [CoreController],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule { }
