import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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

    //hash access_token kirim ke fe lalu compare

    const hashedRefreshToken = await bcrypt.hash(refresh_token, 10);

    await this.prisma.refreshToken.create({
      data: {
        token: hashedRefreshToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    return {
      access_token,
      refresh_token,
    };
  }

  async revokeRefreshToken(refreshToken: string) {
    const tokens = await this.prisma.refreshToken.findMany({
      where: {
        revoked: false,
      },
    });

    for (const stored of tokens) {
      const isMatch = await bcrypt.compare(refreshToken, stored.token);

      if (isMatch) {
        await this.prisma.refreshToken.update({
          where: { id: stored.id },
          data: { revoked: true },
        });

        return { message: 'Logout successful' };
      }
    }

    throw new UnauthorizedException('Invalid refresh token');
  }

  async refresh(refreshToken: string) {
    const tokenRecord = await this.prisma.refreshToken.findFirst({
      where: { revoked: false },
    });

    if (!tokenRecord) throw new UnauthorizedException('Invalid refresh token');

    const isValid = await bcrypt.compare(refreshToken, tokenRecord.token);

    if (!isValid) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.usersRepo.findById(tokenRecord.userId);
    if (!user) throw new NotFoundException('User not found');
    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    const newAccessToken = this.jwtService.sign(payload, { expiresIn: '1h' });

    return {
      access_token: newAccessToken,
    };
  }
}
