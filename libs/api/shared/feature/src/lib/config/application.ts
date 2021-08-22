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
    version,
    host: getEnv('HOST', 'localhost'),
    port: getEnvNumber("PORT", 3000),
    contextPath: getEnv('CONTEXT_PATH', 'api'),
    swaggerPath: getEnv('SWAGGER_URI', 'api/docs'),
    table: {
      page_row_count: 20
    }
  };
});
