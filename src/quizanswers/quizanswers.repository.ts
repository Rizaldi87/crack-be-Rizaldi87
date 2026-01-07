import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuizanswersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.quizAnswer.findMany();
  }

  findOne(id: number) {
    return this.prisma.quizAnswer.findUnique({ where: { id } });
  }

  create(data) {
    return this.prisma.quizAnswer.create({ data });
  }

  update(id: number, data) {
    return this.prisma.quizAnswer.update({ where: { id }, data });
  }

  remove(id: number) {
    return this.prisma.quizAnswer.delete({ where: { id } });
  }

  findByUserIdAndQuestionId(
    userId: number,
    quizId: number,
    questionId: number,
  ) {
    return this.prisma.quizAnswer.findUnique({
      where: {
        studentId_quizId_questionId: { studentId: userId, quizId, questionId },
      },
    });
  }
}
