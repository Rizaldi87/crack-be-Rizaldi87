import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';

@Injectable()
export class ChoicesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.choice.findMany();
  }

  findOne(id: number) {
    return this.prisma.choice.findUnique({ where: { id } });
  }

  create(dto: CreateChoiceDto) {
    return this.prisma.choice.create({ data: dto });
  }

  update(id: number, dto: UpdateChoiceDto) {
    return this.prisma.choice.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.choice.delete({ where: { id } });
  }

  findAllByQuestionId(questionId: number) {
    return this.prisma.choice.findMany({ where: { questionId } });
  }
}
