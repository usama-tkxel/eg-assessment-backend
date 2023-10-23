// auth.controller.ts

import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from 'src/auth/auth.service';
import { AuthDto, CreateUser } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: CreateUser) {
    const user = await this.authService.signUp(dto);
    const response = {
      success: true,
      message: 'User registered successfully',
      user,
    };
    return response;
  }

  @Post('signin')
  async signIn(@Body() dto: AuthDto) {
    const user = await this.authService.signIn(dto);
    if (user) {
      return { loggedIn: true, message: 'Login success', user };
    }
  }
}
