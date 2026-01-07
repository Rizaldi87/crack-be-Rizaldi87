import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CoursesRepository } from './courses.repository';
import { EnrollmentsModule } from 'src/enrollments/enrollments.module';

@Module({
  imports: [PrismaModule, EnrollmentsModule],
  controllers: [CoursesController],
  providers: [CoursesService, CoursesRepository, PrismaModule],
})
export class CoursesModule {}
