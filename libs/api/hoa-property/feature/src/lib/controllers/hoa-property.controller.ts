import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetAll, ApiGetOne, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { HoaPropertyDTO } from '../dto/hoa-property.dto';
import { HoaPropertyService } from '../services/hoa-property.service';

@Controller('hoa-property')
@ApiTags('hoa-property')
export class HoaPropertyController {
  constructor(private readonly hoaPropertyService: HoaPropertyService) {}

  @ApiPost(HoaPropertyDTO)
  //@Scopes('manage')
  create(@Body() propertyDto: HoaPropertyDTO, @UserParam() user: User): Promise<HoaPropertyDTO> {
    return this.hoaPropertyService.create(propertyDto, user);
  }

  @ApiGetOne(HoaPropertyDTO, 'default')
  //@Scopes('view')
  getDefaultProperty(@UserParam('email') email: string): Promise<HoaPropertyDTO> {
    return this.hoaPropertyService.getDefaultPropertyByOwner(email);
  }

  @ApiGetAll(HoaPropertyDTO, 'list')
  //@Scopes('view')
  getAllProperties(@UserParam('email') email: string): Promise<Array<HoaPropertyDTO>> {
    return this.hoaPropertyService.getPropertiesByEmail(email);
  }
}
