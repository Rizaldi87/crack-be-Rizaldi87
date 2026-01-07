import { Injectable } from '@nestjs/common';
import { CreateQuizanswerDto } from './dto/create-quizanswer.dto';
import { UpdateQuizanswerDto } from './dto/update-quizanswer.dto';
import { QuizanswersRepository } from './quizanswers.repository';

@Injectable()
export class QuizanswersService {
  constructor(private readonly repo: QuizanswersRepository) {}
  create(createQuizanswerDto: CreateQuizanswerDto) {
    return this.repo.create(createQuizanswerDto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateQuizanswerDto: UpdateQuizanswerDto) {
    return this.repo.update(id, updateQuizanswerDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
