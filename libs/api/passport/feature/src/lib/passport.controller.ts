// import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
// import { AuthService } from './auth/auth.service';
// import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
// import { LocalAuthGuard } from './auth/guards/local-auth.guard';
// import { Public } from './public-decorator';
// import { User } from './users/users.service';

// @Controller('passport')
// export class PassportController {
//   constructor(private readonly authService: AuthService) {}

//   //@UseGuards(LocalAuthGuard)
//   @Public()
//   @Post('login')
//   async login(@Body() user: User) {
//     return this.authService.login(user);
//   }

//   @Get('profile')
//   getProfile(@Request() req) {
//     return req.user;
//   }
// }
