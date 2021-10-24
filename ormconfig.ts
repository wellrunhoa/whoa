import { ConfigModule } from '@nestjs/config';
import { RequestContext } from 'nestjs-request-context';
import { createRequest, createResponse } from 'node-mocks-http';
import { User } from "./libs/api/core/feature/src/lib/user.model";
import validationSchema from './libs/api/core/feature/src/lib/config/env-schema';
import dbConfiguration from './libs/api/core/feature/src/lib/config/database';

ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  envFilePath: [
    `./environments/.env.${process.env.APP_ENV || 'local'}`,
    './apps/whoa-apis/src/environments/.env.defaults'
  ],
  load: [dbConfiguration],
  validationSchema
});

const config = {
  ...dbConfiguration(),
  entities: [`${process.env.TYPEORM_ENTITIES}`],
  migrations: [`${process.env.TYPEORM_MIGRATIONS}`],
  cli: {
    entitiesDir: `${process.env.TYPEORM_ENTITIES_DIR}`,
    migrationsDir: `${process.env.TYPEORM_MIGRATIONS_DIR}`
  }
};

console.log(config);

RequestContext.currentContext = new RequestContext(
  createRequest(),
  createResponse()
);
RequestContext.currentContext.req.user =  { email: 'a@a.com', sid: '2322' } as User;
console.log(RequestContext.currentContext.req.user);

export default config;
