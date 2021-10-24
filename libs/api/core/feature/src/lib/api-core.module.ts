import { MailerModule } from '@nestjs-modules/mailer';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WinstonModule } from '@payk/nestjs-winston';
import { ApiPublicError } from './models/api-public-error.model';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { join } from 'path';
import { KeycloakConnectModule, ResourceGuard, RoleGuard, AuthGuard } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';
import { ParseFile } from './files/parse-file.pipe';
import { RequestContextMiddleware } from './context/request-context.middleware';
import logConfig from './config/winston';
import validationSchema from './config/env-schema';
import loadConfig from './config/load-config';
import { PrismaService } from './prisma/prisma.service';

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
    KeycloakConnectModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('keycloak')
    }),
    ApiPublicError,
    HttpExceptionFilter
  ],
  controllers: [],
  providers: [
    // These are in order, see https://docs.nestjs.com/guards#binding-guards
    // for more information

    // This adds a global level authentication guard, you can also have it scoped
    // if you like.
    //
    // Will throw a 401 unauthorized when it is unable to
    // verify the JWT token or Bearer header is missing.
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    },
    // This adds a global level resource guard, which is permissive by default (can be configured).
    //
    // Only controllers annotated with `@Resource` and methods with `@Scopes`
    // are handled by this guard.
    //
    // NOTE: This guard is not necessary if you are using role-based authorization exclusively.
    //       You can use role guard exclusively for that.
    //
    {
      provide: APP_GUARD,
      useClass: ResourceGuard
    },

    // This adds a global level role guard, can only be used in conjunction with resource guard
    // when enforcement policy is PERMISSIVE, unless you only use role guard exclusively.
    // This adds a global level role guard, which is permissive.
    //
    // Used by controller methods annotated with `@Roles` (matching can be configured)
    {
      provide: APP_GUARD,
      useClass: RoleGuard
    },
    ParseFile,
    RequestContextMiddleware,
    PrismaService
  ],
  exports: [PrismaService, ApiPublicError, HttpExceptionFilter, RequestContextMiddleware]
})
export class ApiCoreModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
