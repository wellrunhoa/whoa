/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ApiPublicError } from '../models/api-public-error.model';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private config: ConfigService) {}

  catch(error: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse() as Response;
    const req = ctx.getRequest();
    const stacktrace = error.stack;
    const errorName = error.response.name || error.response.error || error.name;
    const errors = error.response.errors || null;
    const path = req ? req.url : null;

    const statusCode = error instanceof HttpException ? error.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    if (statusCode === HttpStatus.UNAUTHORIZED) {
      if (typeof error.response !== 'string') {
        error.response.message =
          error.response.message || 'You do not have permission to access this resource';
      }
    }

    let exception;
    if(this.config.get<string>("environment.appEnv") === 'prod') {
      exception = new ApiPublicError(
        path,
        statusCode,
        error.response.message,
        errorName,
        errors,
        stacktrace,
      );
    } else {
      exception = new ApiPublicError(
        path,
        statusCode,
        error.response.message,
        errorName,
        errors
      );
    }
    
    res.status(statusCode).json(exception);
  }
}
