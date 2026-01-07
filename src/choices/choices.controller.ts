import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ChoicesService } from './choices.service';
import { CreateChoiceDto } from './dto/create-choice.dto';
import { UpdateChoiceDto } from './dto/update-choice.dto';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Choices')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('choices')
export class ChoicesController {
  constructor(private readonly choicesService: ChoicesService) {}

  @Roles('ADMIN')
  @Post()
  @ApiOperation({ summary: 'Create new choice (ADMIN only)' })
  @ApiCreatedResponse({ description: 'Choice successfully created' })
  @ApiBadRequestResponse({ description: 'Invalid request body' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden (ADMIN only)' })
  create(@Body() createChoiceDto: CreateChoiceDto) {
    return this.choicesService.create(createChoiceDto);
  }

  @Roles('ADMIN')
  @Get()
  @ApiOperation({ summary: 'Get all choices (ADMIN only)' })
  @ApiOkResponse({ description: 'List of all choices' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden (ADMIN only)' })
  findAll() {
    return this.choicesService.findAll();
  }

  @Roles('ADMIN')
  @Get(':id')
  @ApiOperation({ summary: 'Get choice by ID (ADMIN only)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Choice detail' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden (ADMIN only)' })
  findOne(@Param('id') id: string) {
    return this.choicesService.findOne(+id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  @ApiOperation({ summary: 'Update choice by ID (ADMIN only)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Choice successfully updated' })
  @ApiBadRequestResponse({ description: 'Invalid request or ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden (ADMIN only)' })
  update(@Param('id') id: string, @Body() updateChoiceDto: UpdateChoiceDto) {
    return this.choicesService.update(+id, updateChoiceDto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  @ApiOperation({ summary: 'Delete choice by ID (ADMIN only)' })
  @ApiParam({ name: 'id', type: Number, example: 1 })
  @ApiOkResponse({ description: 'Choice successfully deleted' })
  @ApiBadRequestResponse({ description: 'Invalid ID' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden (ADMIN only)' })
  remove(@Param('id') id: string) {
    return this.choicesService.remove(+id);
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get all choices by question ID' })
  @ApiParam({ name: 'questionId', type: Number, example: 10 })
  @ApiOkResponse({ description: 'List of choices by question ID' })
  @ApiBadRequestResponse({ description: 'Invalid question ID' })
  findAllByQuestionId(@Param('questionId') questionId: number) {
    return this.choicesService.findAllByQuestionId(questionId);
  }
}
