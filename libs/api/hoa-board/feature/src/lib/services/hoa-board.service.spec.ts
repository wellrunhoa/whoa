import { Test, TestingModule } from '@nestjs/testing';
import { HoaBoardService } from './hoa-board.service';

describe('HoaBoardService', () => {
  let service: HoaBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoaBoardService]
    }).compile();

    service = module.get<HoaBoardService>(HoaBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
