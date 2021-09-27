import { ConfigModule } from '@nestjs/config';
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
export default config;
