import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from '@payk/nestjs-winston';
import { ApiException } from './api-exception.model';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import logConfig from './config/winston';
import validationSchema from './config/env-schema';
import loadConfig from './config/load-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      envFilePath: [
        `environments/.env.${process.env.APP_ENV || 'local'}`,
        join(__dirname, '/environments/.env.defaults')
      ],
      load: loadConfig,
      validationSchema
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => configService.get('mailer'),
      inject: [ConfigService]
    }),
    WinstonModule.forRootAsync({
      useFactory: logConfig,
      inject: []
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('database')
    }),
    ApiException,
    HttpExceptionFilter
  ],
  controllers: [],
  providers: [],
  exports: [ApiException, HttpExceptionFilter, TypeOrmModule]
})
export class ApiSharedModule {}
