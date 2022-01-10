/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpService } from '@nestjs/axios';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceInterceptor implements NestInterceptor {
  private readonly logger = new Logger(HttpServiceInterceptor.name);

  constructor(private httpService: HttpService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const token = ctx.getRequest().headers['authorization'];

    if (token) {
      this.httpService.axiosRef.defaults.headers.common['authorization'] = token;
    }

    this.httpService.axiosRef.defaults.headers.common['accept'] = 'application/json';
    this.httpService.axiosRef.defaults.headers.common['content-type'] = 'application/json';
    this.logger.debug('added token header');
    return next.handle().pipe();
  }
}
