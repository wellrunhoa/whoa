import { getEnv, getEnvBoolean, getEnvNumber } from './utils';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { registerAs } from '@nestjs/config';

export default registerAs('database', () => {
  return {
    type: 'postgres',

    host: getEnv('POSTGRES_HOST'),
    port: getEnvNumber('POSTGRES_PORT'),
    username: getEnv('POSTGRES_USER'),
    password: getEnv('POSTGRES_PASSWORD'),
    database: getEnv('POSTGRES_DATABASE'),

    // We are using migrations, synchronize should be set to false.
    synchronize: false,
    autoLoadEntities: true,
    migrationsTableName: getEnv('TYPEORM_MIGRATIONS_TABLE'),

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: getEnvBoolean('TYPEORM_MIGRATIONS_RUN', false),

    logging: getEnvBoolean('TYPEORM_LOGGING', false),
    logger: 'file',
    namingStrategy: new SnakeNamingStrategy(),
    ...JSON.parse(getEnv('TYPEORM_DRIVER_EXTRA'))
  };
});
