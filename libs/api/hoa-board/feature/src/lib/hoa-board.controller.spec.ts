import { Test, TestingModule } from '@nestjs/testing';
import { HoaBoardController } from './hoa-board.controller';

describe('HoaBoardController', () => {
  let controller: HoaBoardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HoaBoardController]
    }).compile();

    controller = module.get<HoaBoardController>(HoaBoardController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
