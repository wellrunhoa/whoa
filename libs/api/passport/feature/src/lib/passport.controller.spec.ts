import { Test, TestingModule } from '@nestjs/testing';
import { PassportController } from './passport.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

describe('PassportController', () => {
  let appController: PassportController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UsersModule],
      controllers: [PassportController]
    }).compile();

    appController = app.get<PassportController>(PassportController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
