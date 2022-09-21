import { Test, TestingModule } from '@nestjs/testing';
import { LobbyUserService } from './lobby-user.service';

describe('LobbyUserService', () => {
  let service: LobbyUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LobbyUserService],
    }).compile();

    service = module.get<LobbyUserService>(LobbyUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
