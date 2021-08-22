/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { AppInitializer } from '@whoa/api/shared/feature';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await AppInitializer.initialize(app);

  const configService = app.get(ConfigService);
  const globalPrefix = configService.get<string>('application.contextPath');
  const port = configService.get<number>('application.port');
  const host = configService.get<string>('application.host');
  Logger.log("globalPrefix:"+globalPrefix)

  await app.listen(port, () => {
    Logger.log('Listening at http://' + host + ':' + port + '/' + globalPrefix);
  });
}

bootstrap();
