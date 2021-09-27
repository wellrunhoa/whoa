import applicationConfig from './application';
import environmentConfig from './environment';
import mailerConfig from './mailer';
import dbConfig from './database';
import logConfig from './winston';
import keycloakConfig from './keycloak';

export default [
  applicationConfig,
  environmentConfig,
  mailerConfig,
  keycloakConfig,
  dbConfig,
  logConfig
];
