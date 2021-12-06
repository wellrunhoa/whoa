import { Body, Controller } from '@nestjs/common';
import { ApiGetOne, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { HoaPropertyDTO } from '../dto/hoa-property.dto';
import { HoaPropertyService } from '../services/hoa-property.service';

@Controller('hoa-property')
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
}
