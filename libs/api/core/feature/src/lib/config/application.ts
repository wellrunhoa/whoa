import { registerAs } from '@nestjs/config';
import { getEnv, getEnvNumber } from './utils';
import { ApplicationConfig } from './interfaces';
import { version } from '../../../../../../../package.json';

export default registerAs('application', (): ApplicationConfig => {
  const name = getEnv('NAME', 'WHOA-API');
  const description = getEnv('DESCRIPTION', 'WHOA：API module');

  return {
    name,
    description,
    version
  };
});
