import { Module } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { LobbyController } from './lobby.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lobby } from './entities/lobby.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lobby])],
  controllers: [LobbyController],
  providers: [LobbyService],
  exports: [LobbyService]
})
export class LobbyModule {}
