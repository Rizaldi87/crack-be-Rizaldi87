import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoursesRepository } from './courses.repository';

@Module({
  imports: [PrismaModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, PrismaModule],
})
export class CoursesModule {}
