import { Test, TestingModule } from '@nestjs/testing';
import { LobbyUserController } from './lobby-user.controller';
import { LobbyUserService } from './lobby-user.service';

describe('LobbyUserController', () => {
  let controller: LobbyUserController;
  let service: LobbyUserService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [LobbyUserController],
      providers: [LobbyUserService, { provide: 'LobbyUserRepository', useValue: {} }],
    }).compile();

    controller = module.get<LobbyUserController>(LobbyUserController);
    service = module.get<LobbyUserService>(LobbyUserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
