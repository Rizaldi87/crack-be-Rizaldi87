import { PartialType } from '@nestjs/swagger';
import { CreateQuizanswerDto } from './create-quizanswer.dto';

export class UpdateQuizanswerDto extends PartialType(CreateQuizanswerDto) {}
