import { Test, TestingModule } from '@nestjs/testing';
import { QuizanswersService } from './quizanswers.service';

describe('QuizanswersService', () => {
  let service: QuizanswersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuizanswersService],
    }).compile();

    service = module.get<QuizanswersService>(QuizanswersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
