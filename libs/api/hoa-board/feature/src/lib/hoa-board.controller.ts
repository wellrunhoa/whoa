
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Resource, Scopes } from 'nest-keycloak-connect';
import { HoaBoardDTO } from './dto/hoa-board.dto';
import { HoaBoardService } from './services/hoa-board.service';

@Controller('hoa-board')
@Resource('hoa-board')
export class HoaBoardController {
  constructor(private readonly hoaBoardService: HoaBoardService) {}

  @Post()
  @Scopes('manage')
  create(@Body() boardDto: HoaBoardDTO) {
    return this.hoaBoardService.create(boardDto);
  }

  @Get(':id')
  @Scopes('view')
  findById(@Param('id') id: string) {
    return this.hoaBoardService.getById(id);
  }

  @Patch(':id')
  @Scopes('manage')
  update(@Param('id') id: string, @Body() boardDto: HoaBoardDTO) {
    return this.hoaBoardService.update(id, boardDto);
  }
}