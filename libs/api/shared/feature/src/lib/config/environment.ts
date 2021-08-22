import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';
import { EnvironmentConfig } from './interfaces';

export default registerAs('environment', (): EnvironmentConfig => {
  const host = getEnv('HOST', 'localhost');
  const port = getEnvNumber('PORT', 3000);
  const jwt_secret = getEnv('JWT_SECRET', 'cnode');
  const environment = getEnv('NODE_ENV', 'development');
  return {
    host,
    port,
    jwt_secret,
    environment,
    isDevelopment: environment === 'development',
    isProduction: environment === 'production',
    isUat: environment === 'uat'
  };
});
