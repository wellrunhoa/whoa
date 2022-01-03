import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpServiceInterceptor } from '@whoa/api/core/feature';
import { PassportController } from './controllers/passport.controller';
import { UsersService } from './services/users.service';

@Module({
  imports: [HttpModule],
  controllers: [PassportController],
  providers: [
    UsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpServiceInterceptor
    }
  ],
  exports: []
})
export class ApiPassportModule {}
