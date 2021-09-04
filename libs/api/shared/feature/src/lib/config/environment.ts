import { registerAs } from '@nestjs/config';
import { getEnv, getEnvBoolean, getEnvNumber } from './utils';
import { EnvironmentConfig } from './interfaces';

export default registerAs('environment', (): EnvironmentConfig => {
  const host = getEnv('HOST', 'localhost');
  const port = getEnvNumber('PORT', 3000);
  const jwtSecret = getEnv('JWT_SECRET', 'cnode');
  const environment = getEnv('APP_ENV', 'dev');
  const enableSwagger = getEnvBoolean('ENABLE_SWAGGER', true);
  return {
    host,
    port,
    jwtSecret,
    environment,
    enableSwagger,
    isProduction: environment === 'prod',
    contextPath: getEnv('CONTEXT_PATH', 'api'),
    swaggerPath: getEnv('SWAGGER_URI', 'api/docs'),
    table: {
      page_row_count: 20
    }
  };
});
