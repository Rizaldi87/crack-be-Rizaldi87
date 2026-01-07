import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.question.findMany();
  }

  findOne(id: number) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  remove(id: number) {
    return this.prisma.question.delete({ where: { id } });
  }

  create(dto: CreateQuestionDto) {
    return this.prisma.question.create({ data: dto });
  }

  update(id: number, dto: UpdateQuestionDto) {
    return this.prisma.question.update({ where: { id }, data: dto });
  }

  findAllByQuizId(quizId: number) {
    return this.prisma.question.findMany({ where: { quizId } });
  }
}
