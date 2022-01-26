/* eslint-disable @typescript-eslint/no-explicit-any */
import { basename, join } from 'path';
import { getEnv, getEnvNumber } from './utils';
import * as winston from 'winston';
import { registerAs } from '@nestjs/config';

export default registerAs('winston', () => {
  const fiveMegaBytes = getEnvNumber('LOG_FILE_SIZE', 5000000);
  const rootFolder = getEnv('ROOT_FOLDER', __dirname);
  const logLevel = getEnv('LOG_LEVEL', 'error');

  return {
    transports: [
      new winston.transports.Console({
        level: logLevel,
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp({ format: 'MM/DD/YYYY HH:mm:ss' }),
          winston.format.errors({ stack: true }),
          winston.format.printf(({ level, message, timestamp, stack }) => {
            if (typeof message === 'object') {
              message = JSON.stringify(message, null, 2);
            }
            if (stack) {
              // print log trace
              return `${timestamp} [${level}]: ${message} - ${stack}`;
            }
            return `${timestamp} [${level}]: ${message}`;
          })
        ),
        handleExceptions: true
      }),
      new winston.transports.File({
        level: logLevel,
        filename: join(rootFolder, '/logs/server.log'),
        maxsize: fiveMegaBytes,
        maxFiles: 5,
        tailable: true,
        handleExceptions: true
      })
    ],
    format: winston.format.combine(
      winston.format((info) => {
        info.env = getEnv('APP_ENV', 'dev');
        const filename = getCallerFile();

        if (filename) {
          info.file = basename(getCallerFile());
        }
        return info;
      })(),
      winston.format.splat(),
      winston.format.errors({ stack: true }),
      winston.format.timestamp(),
      winston.format.json(),
      winston.format.prettyPrint()
    ),
    exitOnError: false
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

        if (currentfile !== callerfile && !callerfile.includes('node_modules') && !callerfile.includes('internal/process')) return callerfile;
      }
    } catch (err) {
      //ignore
    }
    return '';
  }
});
