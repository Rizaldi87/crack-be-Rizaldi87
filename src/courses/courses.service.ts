import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CoursesRepository } from './courses.repository';
import { EnrollmentsService } from 'src/enrollments/enrollments.service';
import { unlink } from 'fs';

@Injectable()
export class CoursesService {
  constructor(
    private readonly repo: CoursesRepository,
    private readonly enrollmentsService: EnrollmentsService,
  ) {}
  create(createCourseDto: CreateCourseDto & { image?: string }) {
    return this.repo.create(createCourseDto);
  }

  findAllPublished() {
    return this.repo.findAllPublished();
  }

  findAll() {
    return this.repo.findAll();
  }

  findOne(id: number) {
    return this.repo.findOne(id);
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return this.repo.update(id, updateCourseDto);
  }

  remove(id: number) {
    return this.repo.remove(id);
  }

  enroll(userId: number, courseId: number) {
    return this.enrollmentsService.enroll(userId, courseId);
  }

  unEnroll(userId: number, courseId: number) {
    return this.enrollmentsService.unEnroll(userId, courseId);
  }

  countAllCourses() {
    return this.repo.countAllCourses();
  }

  async updateImage(courseId: number, filename: string) {
    const course = await this.repo.findOne(courseId);

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    // optional: hapus image lama
    if (course.image) {
      unlink(`uploads/images/${course.image}`, () => {});
    }

    return this.repo.update(courseId, {
      image: filename,
    });
  }

  async findOnePublishedWithLessons(id: number) {
    return this.repo.findOnePublishedWithLessons(id);
  }
}
