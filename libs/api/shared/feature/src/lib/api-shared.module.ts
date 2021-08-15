import { Module } from '@nestjs/common';
import { ApiException } from './api-exception.model';
import { HttpExceptionFilter } from './filters/http-exception.filter';

@Module({
  imports: [ApiException, HttpExceptionFilter],
  controllers: [],
  providers: [],
  exports: [ApiException, HttpExceptionFilter]
})
export class ApiSharedModule {}
