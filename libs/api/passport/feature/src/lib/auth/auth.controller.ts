import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Public } from '../public-decorator';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
