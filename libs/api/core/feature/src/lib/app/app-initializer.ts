import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { Swagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';
import { ValidationExceptionFactory } from '../validation/validation-exception.factory';
import { urlencoded, json } from 'express';

export class AppInitializer {
  static async initialize(app: INestApplication) {
    const config = app.get(ConfigService);
    const globalPrefix = config.get<string>('environment.contextPath');

    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new ValidationPipe({ transform: true, exceptionFactory: ValidationExceptionFactory }));
    app.useGlobalFilters(new HttpExceptionFilter(config));
    app.setGlobalPrefix(globalPrefix);

    // the next two lines did the trick
    app.use(json({ limit: '50mb' }));
    app.use(urlencoded({ limit: '50mb', extended: true }));

    if (config.get<boolean>('environment.enableSwagger')) {
      await Swagger.addSwagger(app, config);
    }
  }
}
