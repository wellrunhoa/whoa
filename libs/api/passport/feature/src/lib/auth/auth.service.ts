import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDTO, TokenPayloadDTO } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(credentials: AuthLoginDTO) {
    const user = await this.usersService.validateUser(credentials.email, credentials.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password.');
    }
    if (!user.active) {
      // const token = encryptMD5(user.email + user.pass + this.secret);
      // this.mailService.sendActiveMail(user.email, token, user.loginname);
      throw new UnauthorizedException(
        'This account has not been activated, the activation link has been sent to' +
          user.email +
          ' Email, please check.'
      );
    }
    const payload = { email: user.email, sub: user.id } as TokenPayloadDTO;
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
