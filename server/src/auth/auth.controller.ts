import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { Response } from 'express';
import {
  Controller,
  Post,
  Request,
  UseGuards,
  Body,
  Res,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register') // POST /auth/register
  async registerUser(
    @Body() body: { username: string; password: string },
    @Res() res: Response,
  ) {
    const { username, password } = body;
    const user = await this.userService.createUser(username, password);
    if (user) {
      const token = this.authService.login(user);
      return res.status(201).json(token);
    }
    return res.status(401).json('username already exists');
  }

  @UseGuards(AuthGuard('local'))
  @Post('login') // POST /auth/login
  loginUser(@Request() req: { user: { username: string; id: number } }) {
    return this.authService.login(req.user);
  }
}
