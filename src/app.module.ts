import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuizModule } from './quiz/quiz.module';

@Module({
  imports: [PrismaModule, CoursesModule, AuthModule, UsersModule, LessonsModule, QuizModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
