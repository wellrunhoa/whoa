import { Body, Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApiGetOne, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { ServiceRequestDTO } from '../dto/service-request.dto';
import { ServiceRequestService } from '../services/service-request.service';

@Controller('service-request')
@ApiTags('service-request')
export class ServiceRequestController {
  constructor(private readonly serviceRequestService: ServiceRequestService) {}

  @ApiPost(ServiceRequestDTO)
  //@Scopes('manage')
  create(@Body() serviceRequestDto: ServiceRequestDTO, @UserParam() user: User): Promise<ServiceRequestDTO> {
    return this.serviceRequestService.create(serviceRequestDto, user);
  }

  @ApiGetOne(ServiceRequestDTO, 'list')
  //@Scopes('view')
  getServiceRequestHistory(@UserParam('email') email: string, @UserParam('email') propertyId: string): Promise<Array<ServiceRequestDTO>> {
    return this.serviceRequestService.getById(email);
  }
}
