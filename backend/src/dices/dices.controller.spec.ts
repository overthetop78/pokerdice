import { Test, TestingModule } from '@nestjs/testing';
import { DicesController } from './dices.controller';
import { DicesModule } from './dices.module';
import { DicesService } from './dices.service';

describe('DicesController', () => {
  let controller: DicesController;
  let service: DicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DicesModule],
      controllers: [DicesController],
      providers: [DicesService,
        { provide: 'DicesRepository', useValue: {} },
      ],
    }).compile();

    controller = module.get<DicesController>(DicesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
