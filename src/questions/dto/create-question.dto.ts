import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  quizId: number;

  @ApiProperty({ example: 'what is verb?' })
  @IsNotEmpty()
  @IsString()
  questionText: string;
}
