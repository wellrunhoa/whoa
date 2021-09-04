import applicationConfig from './application';
import environmentConfig from './environment';
import mailerConfig from './mailer';
import dbConfig from './database';
import logConfig from './winston';

export default [
  applicationConfig,
  environmentConfig,
  mailerConfig,
  dbConfig,
  logConfig
];