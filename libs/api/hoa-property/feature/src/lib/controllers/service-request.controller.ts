import { Body, Controller, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetAll, ApiGetOne, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { ServiceRequestDTO } from '../dto/service-request.dto';
import { ServiceRequestService } from '../services/service-request.service';

@Controller('service-request')
@ApiTags('service-request')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @ApiPost(ServiceRequestDTO, ':propertyId')
  //@Scopes('manage')
  create(@Body() serviceRequestDto: ServiceRequestDTO, @UserParam() user: User, @Param('propertyId') propertyId: string): Promise<ServiceRequestDTO> {
    console.log('serviceReq in controller', serviceRequestDto);
    return this.serviceRequestService.create(serviceRequestDto, user, propertyId);
  }

  @ApiGetAll(ServiceRequestDTO, 'list/:propertyId')
  //@Scopes('view')
  getServiceRequestHistory(@UserParam('email') email: string, @Param('propertyId') propertyId: string): Promise<Array<ServiceRequestDTO>> {
    return this.serviceRequestService.getById(email, propertyId);
  }
}
