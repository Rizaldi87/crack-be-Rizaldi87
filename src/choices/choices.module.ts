import { Module } from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { ChoicesController } from './choices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChoicesRepository } from './choices.repository';

@Module({
  imports: [PrismaModule],
  controllers: [ChoicesController],
  providers: [ChoicesService, ChoicesRepository],
})
export class ChoicesModule {}
