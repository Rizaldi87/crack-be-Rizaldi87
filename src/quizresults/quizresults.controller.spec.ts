import { Test, TestingModule } from '@nestjs/testing';
import { QuizresultsController } from './quizresults.controller';
import { QuizresultsService } from './quizresults.service';

describe('QuizresultsController', () => {
  let controller: QuizresultsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuizresultsController],
      providers: [QuizresultsService],
    }).compile();

    controller = module.get<QuizresultsController>(QuizresultsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
