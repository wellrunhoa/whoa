import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_UNSECURED_KEY } from '../../unsecured-decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isUnsecured = this.reflector.getAllAndOverride<boolean>(IS_UNSECURED_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (isUnsecured) {
      return true;
    }
    return super.canActivate(context);
  }
}
