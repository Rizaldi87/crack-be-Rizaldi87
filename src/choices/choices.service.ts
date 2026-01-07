import { Injectable } from '@nestjs/common';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { ChoicesRepository } from './choices.repository';

@Injectable()
export class ChoicesService {
  constructor(private readonly repo: ChoicesRepository) {}

  create(createChoiceDto: CreateChoiceDto) {
    return this.repo.create(createChoiceDto);
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateChoiceDto: UpdateChoiceDto) {
    return this.repo.update(id, updateChoiceDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  findAllByQuestionId(questionId: number) {
    return this.repo.findAllByQuestionId(questionId);
  }
}
