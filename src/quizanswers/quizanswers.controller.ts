import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { QuizanswersService } from './quizanswers.service';
import { CreateQuizanswerDto } from './dto/create-quizanswer.dto';
import { UpdateQuizanswerDto } from './dto/update-quizanswer.dto';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Quiz Answers (Admin Only)')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('quizanswers')
export class QuizanswersController {
  constructor(private readonly quizanswersService: QuizanswersService) {}

  @Post()
  @ApiOperation({ summary: 'Create quiz answer record' })
  @ApiBody({ type: CreateQuizanswerDto })
  @ApiResponse({ status: 201, description: 'Quiz answer created' })
  @ApiResponse({ status: 400, description: 'Invalid input' })
  create(@Body() createQuizanswerDto: CreateQuizanswerDto) {
    return this.quizanswersService.create(createQuizanswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quiz answers' })
  @ApiResponse({ status: 200, description: 'List of quiz answers' })
  findAll() {
    return this.quizanswersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz answer by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Quiz answer found' })
  @ApiResponse({ status: 404, description: 'Quiz answer not found' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.quizanswersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update quiz answer' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateQuizanswerDto })
  @ApiResponse({ status: 200, description: 'Quiz answer updated' })
  @ApiResponse({ status: 404, description: 'Quiz answer not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateQuizanswerDto: UpdateQuizanswerDto,
  ) {
    return this.quizanswersService.update(id, updateQuizanswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz answer' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Quiz answer deleted' })
  @ApiResponse({ status: 404, description: 'Quiz answer not found' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.quizanswersService.remove(id);
  }
}
