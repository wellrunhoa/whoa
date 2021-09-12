import * as Joi from 'joi';

const string = Joi.string();
const number = Joi.string();
const boolean = Joi.boolean();

export default Joi.object({
  ENV: string.valid('dev', 'prod', 'test', 'prov', 'local').default('local'),
  PORT: number.default(3000),
  HOST: string.default('localhost'),
  ROOT_FOLDER: string.default(__dirname),
  LOG_FILE_SIZE: number.default(5000000),

  JWT_SECRET: string.required(),

  //keycloak
  AUTH_SERVER_URL: string.required(),
  AUTH_REALM: string.required(),
  AUTH_CLIENTID: string.required(),
  AUTH_SECRET: string.required(),
  AUTH_LOG_LEVEL: string.default('warn'),

  // upload location
  UPLOAD_LOCATION: string.required(),

  // mail
  MAIL_HOST: string.hostname().required(),
  MAIL_PORT: number.required(),
  MAIL_USER: string.email().required(),
  MAIL_PASS: string.required(),

  //postgres
  POSTGRES_HOST: string.hostname().required(),
  POSTGRES_PORT: number.required(),
  POSTGRES_USER: string.required(),
  POSTGRES_PASSWORD: string.required(),
  POSTGRES_DATABASE: string.required(),

  //typeorm
  TYPEORM_LOGGING: boolean.required(),
  TYPEORM_ENTITIES: string.required(),
  TYPEORM_MIGRATIONS: string.required(),
  TYPEORM_MIGRATIONS_RUN: boolean.required(),
  TYPEORM_ENTITIES_DIR: string.required(),
  TYPEORM_MIGRATIONS_DIR: string.required(),
  TYPEORM_MIGRATIONS_TABLE: string.required(),
  TYPEORM_DRIVER_EXTRA: string.required()
});
