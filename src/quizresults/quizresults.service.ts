import { Injectable } from '@nestjs/common';
import { CreateQuizresultDto } from './dto/create-quizresult.dto';
import { UpdateQuizresultDto } from './dto/update-quizresult.dto';
import { QuizresultsRepository } from './quizresults.repository';

@Injectable()
export class QuizresultsService {
  constructor(private readonly repo: QuizresultsRepository) {}
  create(createQuizresultDto: CreateQuizresultDto) {
    return this.repo.create(createQuizresultDto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateQuizresultDto: UpdateQuizresultDto) {
    return this.repo.update(id, updateQuizresultDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }
}
