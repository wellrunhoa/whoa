import applicationConfig from './application';
import environmentConfig from './environment';
import mailerConfig from './mailer';
import { logConfig } from './winston';

export default [
  applicationConfig,
  environmentConfig,
  mailerConfig,
  logConfig
];