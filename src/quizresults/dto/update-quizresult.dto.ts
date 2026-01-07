import { PartialType } from '@nestjs/swagger';
import { CreateQuizresultDto } from './create-quizresult.dto';

export class UpdateQuizresultDto extends PartialType(CreateQuizresultDto) {}
