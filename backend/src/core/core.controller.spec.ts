import { Test, TestingModule } from '@nestjs/testing';
import { DicesService } from '../dices/dices.service';
import { LobbyUserService } from '../lobby-user/lobby-user.service';
import { DicesController } from '../dices/dices.controller';
import { DicesModule } from '../dices/dices.module';
import { LobbyUserModule } from '../lobby-user/lobby-user.module';
import { Core } from './core';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { CoreModule } from './core.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CoreController', () => {
  let controller: CoreController;
  let service: CoreService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      controllers: [CoreController],
      providers: [
        CoreService,
        Core,
        { provide: 'CoreRepository', useValue: {} },
        { provide: 'LobbyUserRepository', useValue: {} },
        { provide: 'DicesRepository', useValue: {} },
      ],
    }).compile();

    controller = module.get<CoreController>(CoreController);
    service = module.get<CoreService>(CoreService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
