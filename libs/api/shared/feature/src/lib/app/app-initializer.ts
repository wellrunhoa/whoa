import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { Swagger } from './swagger';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';

export class AppInitializer {
  static async initialize(app: INestApplication) {
    const configService = app.get(ConfigService);
    const globalPrefix = configService.get<string>('application.contextPath');
    
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix(globalPrefix);

    await Swagger.addSwagger(app, configService);
  }
}
