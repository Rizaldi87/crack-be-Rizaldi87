import { Test, TestingModule } from '@nestjs/testing';
import { QuizanswersController } from './quizanswers.controller';
import { QuizanswersService } from './quizanswers.service';

describe('QuizanswersController', () => {
  let controller: QuizanswersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizanswersController],
      providers: [QuizanswersService],
    }).compile();

    controller = module.get<QuizanswersController>(QuizanswersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
