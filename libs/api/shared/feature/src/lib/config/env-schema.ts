import * as Joi from 'joi';

const string = Joi.string();
const number = Joi.string();
//const boolean = Joi.boolean();

export default Joi.object({
  ENV: string.valid('dev', 'prod', 'test', 'prov', 'local').default('local'),
  PORT: number.default(3000),
  HOST: string.default('localhost'),
  JWT_SECRET: string.required(),
  // upload location
  UPLOAD_LOCATION: string.required(),
  // mail
  MAIL_HOST: string.hostname().required(),
  MAIL_PORT: number.required(),
  MAIL_USER: string.email().required(),
  MAIL_PASS: string.required()
});
