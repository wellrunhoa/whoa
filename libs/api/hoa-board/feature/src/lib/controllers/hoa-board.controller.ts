import { Controller, Body, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Resource, Scopes } from 'nest-keycloak-connect';
import { HoaBoardDTO } from '../dto/hoa-board.dto';
import { HoaBoardService } from '../services/hoa-board.service';
import { ApiGetAll, ApiGetOne, ApiPatch, ApiPost } from '@whoa/api/core/feature';
import { CommunityDTO } from '../dto/community.dto';

@Controller('hoa-board')
@Resource('hoa-board')
@ApiTags('hoa-board')
export class HoaBoardController {
  constructor(private readonly hoaBoardService: HoaBoardService) {}

  @ApiPost(HoaBoardDTO)
  @Scopes('manage')
  create(@Body() boardDto: HoaBoardDTO): Promise<HoaBoardDTO> {
    return this.hoaBoardService.create(boardDto);
  }

  @ApiGetOne(HoaBoardDTO, ':id')
  @Scopes('view')
  findById(@Param('id') id: string): Promise<HoaBoardDTO> {
    return this.hoaBoardService.getById(id);
  }

  @ApiPatch(HoaBoardDTO, ':id')
  @Scopes('manage')
  update(@Param('id') id: string, @Body() boardDto: HoaBoardDTO): Promise<HoaBoardDTO> {
    return this.hoaBoardService.update(id, boardDto);
  }

  @ApiGetAll(CommunityDTO, 'community/search/name')
  getCommunitiesBasic(@Query('name') name: string): Promise<CommunityDTO[]> {
    return this.hoaBoardService.getCommunitiesBasic(name);
  }
}
