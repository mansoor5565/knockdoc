import { Test, TestingModule } from '@nestjs/testing';
import { DoctortimeslotService } from './doctortimeslot.service';

describe('DoctortimeslotService', () => {
  let service: DoctortimeslotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DoctortimeslotService],
    }).compile();

    service = module.get<DoctortimeslotService>(DoctortimeslotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
