import { Module } from '@nestjs/common';
import { CoreService } from './core.service';
import { CoreController } from './core.controller';
import { LobbyUserModule } from 'src/lobby-user/lobby-user.module';

@Module({
  imports: [LobbyUserModule],
  controllers: [CoreController],
  providers: [CoreService],
  exports: [CoreService],
})
export class CoreModule {}
