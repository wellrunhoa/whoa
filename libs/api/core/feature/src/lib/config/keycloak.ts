import { registerAs } from '@nestjs/config';
import { getEnv } from './utils';

export default registerAs('keycloak', () => {
  return {
    authServerUrl: getEnv('AUTH_SERVER_URL'),
    realm: getEnv('AUTH_REALM'),
    clientId: getEnv('AUTH_CLIENTID'),
    secret: getEnv('AUTH_SECRET')
  };
});
