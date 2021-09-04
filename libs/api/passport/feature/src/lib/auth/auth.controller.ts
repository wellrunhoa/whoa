import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Unsecured } from '../unsecured-decorator';
import { AuthLoginDTO } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Unsecured()
  @Post('login')
  async login(@Body() credentials: AuthLoginDTO) {
    return this.authService.login(credentials);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
