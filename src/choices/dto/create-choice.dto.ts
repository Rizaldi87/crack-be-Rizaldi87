import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateChoiceDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  questionId: number;

  @ApiProperty({ example: 'To be or not to be' })
  @IsNotEmpty()
  @IsString()
  text: string;

  @ApiProperty({ example: true })
  @IsNotEmpty()
  @IsBoolean()
  isCorrect: boolean;
}
