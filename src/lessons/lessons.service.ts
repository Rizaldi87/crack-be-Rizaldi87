import { ConflictException, Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { LessonsRepository } from './lessons.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class LessonsService {
  constructor(private readonly repo: LessonsRepository) {}
  async create(createLessonDto: CreateLessonDto) {
    try {
      return await this.repo.create(createLessonDto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException(
          'order with this value on this course already exists',
        );
      }
      throw error;
    }
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return this.repo.update(id, updateLessonDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  findAllbyCourseId(courseId: number) {
    return this.repo.findAllbyCourseId(courseId);
  }

  countAllLessons() {
    return this.repo.countAllLessons();
  }

  reorderLessons(courseId: number, orders: { id: number; order: number }[]) {
    return this.repo.reorderLessons(courseId, orders);
  }
}
