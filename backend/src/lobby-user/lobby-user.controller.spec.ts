import { Test, TestingModule } from '@nestjs/testing';
import { LobbyUserController } from './lobby-user.controller';
import { LobbyUserService } from './lobby-user.service';

describe('LobbyUserController', () => {
  let controller: LobbyUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LobbyUserController],
      providers: [LobbyUserService],
    }).compile();

    controller = module.get<LobbyUserController>(LobbyUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
