import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLessonDto {
  @ApiProperty({ example: 1, description: 'Course ID' })
  @IsNotEmpty()
  @IsNumber()
  courseId: number;

  @ApiProperty({ example: 'Introduction to NestJS' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'This lesson explains the basics of NestJS.' })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({ example: 1, description: 'Lesson order in course' })
  @IsNotEmpty()
  @IsNumber()
  order: number;
}
