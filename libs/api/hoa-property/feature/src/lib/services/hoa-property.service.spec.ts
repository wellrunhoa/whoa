import { Test, TestingModule } from '@nestjs/testing';
import { HoaPropertyService } from './hoa-property.service';

describe('HoaPropertyService', () => {
  let service: HoaPropertyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HoaPropertyService]
    }).compile();

    service = module.get<HoaPropertyService>(HoaPropertyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
