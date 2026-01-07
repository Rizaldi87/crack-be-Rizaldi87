import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionsRepository } from './questions.repository';

@Injectable()
export class QuestionsService {
  constructor(private readonly repo: QuestionsRepository) {}
  create(createQuestionDto: CreateQuestionDto) {
    return this.repo.create(createQuestionDto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return this.repo.update(id, updateQuestionDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  findAllByQuizId(quizId: number) {
    return this.repo.findAllByQuizId(quizId);
  }
}
