import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    // Registration logic will go here
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    // Login logic will go here
    return this.authService.login(dto.email, dto.password);
  }
}
