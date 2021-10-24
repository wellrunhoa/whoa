import { getEnv, getEnvBoolean, getEnvNumber } from './utils';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    //type: 'postgres',
    type: 'postgresql',
    host: getEnv('POSTGRES_HOST'),
    port: getEnvNumber('POSTGRES_PORT'),
    username: getEnv('POSTGRES_USER'),
    password: getEnv('POSTGRES_PASSWORD'),
    name: getEnv('POSTGRES_DATABASE'),
    url:
      'postgresql://' +
      getEnv('POSTGRES_USER') +
      ':' +
      getEnv('POSTGRES_PASSWORD') +
      '@' +
      getEnv('POSTGRES_HOST') +
      ':' +
      getEnvNumber('POSTGRES_PORT') +
      '/' +
      getEnv('POSTGRES_DATABASE') +
      '?schema=public',

    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    autoLoadEntities: true,
    migrationsTableName: getEnv('TYPEORM_MIGRATIONS_TABLE'),

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: getEnvBoolean('TYPEORM_MIGRATIONS_RUN', false),

    logging: getEnvBoolean('TYPEORM_LOGGING', false),
    logger: 'file',
    ...JSON.parse(getEnv('TYPEORM_DRIVER_EXTRA'))
  };
});
