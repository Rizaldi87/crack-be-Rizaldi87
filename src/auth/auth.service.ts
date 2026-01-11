import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly usersRepo: UsersRepository,
  ) {}

  async register(dto: CreateUserDto) {
    return this.usersRepo.create(dto);
  }
  async login(email, password) {
    const user = await this.usersRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    const access_token = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refresh_token = this.jwtService.sign(payload, { expiresIn: '7d' });

    await this.prisma.refreshToken.create({
      data: {
        token: refresh_token,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async revokeRefreshToken(token: string) {
    await this.prisma.refreshToken.update({
      where: { token },
      data: { revoked: true },
    });
  }
}
