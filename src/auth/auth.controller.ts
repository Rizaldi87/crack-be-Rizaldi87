import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt.auth.guard';
import type { Response } from 'express';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiCreatedResponse({ description: 'User successfully registered' })
  @ApiBadRequestResponse({ description: 'Invalid input data' })
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiOkResponse({ description: 'Login successful (JWT returned)' })
  @ApiUnauthorizedResponse({ description: 'Invalid email or password' })
  login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.authService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(@Req() req) {
    return {
      user: req.user,
    };
  }

  @Post('logout')
  @ApiOperation({ summary: 'User logout' })
  @ApiOkResponse({ description: 'Logout successful' })
  @ApiUnauthorizedResponse({ description: 'Invalid refresh token' })
  logout(@Body('refresh_token') refreshToken: string) {
    return this.authService.revokeRefreshToken(refreshToken);
  }
}
