import { Test, TestingModule } from '@nestjs/testing';
import { DoctortimeslotController } from './doctortimeslot.controller';
import { DoctortimeslotService } from './doctortimeslot.service';

describe('DoctortimeslotController', () => {
  let controller: DoctortimeslotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DoctortimeslotController],
      providers: [DoctortimeslotService],
    }).compile();

    controller = module.get<DoctortimeslotController>(DoctortimeslotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
