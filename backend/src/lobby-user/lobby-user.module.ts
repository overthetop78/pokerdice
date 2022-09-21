import { Module } from '@nestjs/common';
import { LobbyUserService } from './lobby-user.service';
import { LobbyUserController } from './lobby-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LobbyUser } from './entities/lobby-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LobbyUser])],
  controllers: [LobbyUserController],
  providers: [LobbyUserService],
  exports: [LobbyUserService]
})
export class LobbyUserModule {}
