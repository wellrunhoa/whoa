/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiPublicError } from '../models/api-public-error.model';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(private config: ConfigService) {}

  catch(error: any, host: ArgumentsHost) {
    console.log('catch: ', error);
    if (error instanceof Error) {
      this.logger.error('HttpExceptionFilter catch ', error);
    } else {
      this.logger.error('HttpExceptionFilter catch ', JSON.stringify(error, null, 2));
    }
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const stacktrace = error.stack;
    const errorName = error.response?.name || error.response?.error || error.name;
    const errors = error.response?.errors || null;
    const path = req ? req.url : null;

    const statusCode = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.debug('statusCode: ', statusCode);
    this.logger.debug('errorName: ', errorName);
    this.logger.debug('stacktrace: ', stacktrace);

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== 'string') {
        error.response.message = error.response?.message || 'You do not have permission to access this resource';
      }
    }

    let exception;
    if (this.config.get<string>('environment.appEnv') !== 'prod') {
      exception = new ApiPublicError(path, statusCode, error.response?.message, errorName, errors, stacktrace);
    } else {
      exception = new ApiPublicError(path, statusCode, error.response?.message, errorName, errors);
    }

    res.status(statusCode).json(exception);
  }
}
