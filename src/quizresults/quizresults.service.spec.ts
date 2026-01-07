import { Test, TestingModule } from '@nestjs/testing';
import { QuizresultsService } from './quizresults.service';

describe('QuizresultsService', () => {
  let service: QuizresultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizresultsService],
    }).compile();

    service = module.get<QuizresultsService>(QuizresultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
