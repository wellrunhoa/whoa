import { Test, TestingModule } from '@nestjs/testing';
import { HoaPropertyController } from './hoa-property.controller';

describe('HoaPropertyController', () => {
  let controller: HoaPropertyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoaPropertyController]
    }).compile();

    controller = module.get<HoaPropertyController>(HoaPropertyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
