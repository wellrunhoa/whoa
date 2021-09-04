import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { Swagger } from './swagger';
import { ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from '@payk/nestjs-winston';

export class AppInitializer {
  static async initialize(app: INestApplication) {
    const config = app.get(ConfigService);
    const globalPrefix = config.get<string>('environment.contextPath');
    
    app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalFilters(new HttpExceptionFilter());
    app.setGlobalPrefix(globalPrefix);

    if(config.get<boolean>('environment.enableSwagger')) {
      await Swagger.addSwagger(app, config);
    }
  }
}
