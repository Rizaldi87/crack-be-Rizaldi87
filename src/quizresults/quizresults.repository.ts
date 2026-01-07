import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizresultsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.quizResult.findMany();
  }

  findOne(id: number) {
    return this.prisma.quizResult.findUnique({ where: { id } });
  }

  create(data) {
    return this.prisma.quizResult.create({ data });
  }

  update(id: number, data) {
    return this.prisma.quizResult.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.quizResult.delete({ where: { id } });
  }

  findByUserIdAndQuizId(userId: number, quizId: number) {
    return this.prisma.quizResult.findUnique({
      where: { studentId_quizId: { studentId: userId, quizId } },
    });
  }
}
