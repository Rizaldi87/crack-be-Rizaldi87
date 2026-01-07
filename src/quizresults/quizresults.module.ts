import { Module } from '@nestjs/common';
import { QuizresultsService } from './quizresults.service';
import { QuizresultsController } from './quizresults.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { QuizresultsRepository } from './quizresults.repository';

@Module({
  imports: [PrismaModule],
  controllers: [QuizresultsController],
  providers: [QuizresultsService, QuizresultsRepository],
})
export class QuizresultsModule {}
