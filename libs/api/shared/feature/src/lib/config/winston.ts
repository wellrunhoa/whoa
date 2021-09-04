/* eslint-disable @typescript-eslint/no-explicit-any */
import { basename, join } from 'path';
import { getEnv, getEnvNumber } from './utils';
import * as winston from 'winston';
import { registerAs } from '@nestjs/config';

export default registerAs('winston', () => {
  const fiveMegaBytes = getEnvNumber('LOG_FILE_SIZE', 5000000);
  const rootFolder = getEnv('ROOT_FOLDER', __dirname);

  return {
    transports: [
      new winston.transports.Console({
        level: 'debug',
        //format: winston.format.combine(winston.format.timestamp(), winston.format.ms())
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
          winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
        )
      }),
      new winston.transports.File({
        level: 'debug',
        filename: join(rootFolder, '/logs/server.log'),
        maxsize: fiveMegaBytes,
        maxFiles: 5,
        tailable: true
      })
    ],
    exceptionHandlers: [
      new winston.transports.File({
        level: 'debug',
        filename: join(rootFolder, '/logs/exceptions.log'),
        maxsize: fiveMegaBytes,
        maxFiles: 5,
        tailable: true
      })
    ],
    handleExceptions: true,
    format: winston.format.combine(
      winston.format((info) => {
        info.env = getEnv('APP_ENV', 'dev');
        const filename = getCallerFile();

        if (filename) {
          info.file = basename(getCallerFile());
        }
        return info;
      })(),
      winston.format.timestamp(),
      winston.format.splat(),
      winston.format.json()
    )
  };

  function getCallerFile(): string {
    try {
      const err = new Error();
      let callerfile;
      Error.prepareStackTrace = function (_err, stack) {
        return stack;
      };
      const currentfile = (err.stack as any).shift().getFileName();

      while (err.stack.length) {
        callerfile = (err.stack as any).shift().getFileName();

        if (
          currentfile !== callerfile &&
          !callerfile.includes('node_modules') &&
          !callerfile.includes('internal/process')
        )
          return callerfile;
      }
    } catch (err) {
      //ignore
    }
    return '';
  }
});
