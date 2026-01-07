import { Module } from '@nestjs/common';
import { QuizanswersService } from './quizanswers.service';
import { QuizanswersController } from './quizanswers.controller';
import { QuizanswersRepository } from './quizanswers.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [QuizanswersController],
  providers: [QuizanswersService, QuizanswersRepository],
})
export class QuizanswersModule {}
