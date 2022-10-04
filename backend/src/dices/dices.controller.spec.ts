import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DicesController } from './dices.controller';
import { DicesModule } from './dices.module';
import { DicesService } from './dices.service';
import { Dice } from './entities/dice.entity';

describe('DicesController', () => {
  let controller: DicesController;
  let service: DicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [Dice],
      controllers: [DicesController],
      providers: [DicesService,
        { provide: 'DiceRepository', useValue: {} },
      ],
    }).compile();

    controller = module.get<DicesController>(DicesController);
    service = module.get<DicesService>(DicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
