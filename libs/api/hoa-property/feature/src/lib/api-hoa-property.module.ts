import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { HoaPropertyService } from './services/hoa-property.service';
import { HoaPropertyController } from './controllers/hoa-property.controller';
import {ServiceRequestService} from './services/service-request.service';
import {ServiceRequestController} from './controllers/service-request.controller'

@Module({
  imports: [ApiCoreModule],
  controllers: [HoaPropertyController, ServiceRequestController],
  providers: [HoaPropertyService, ServiceRequestService],
  exports: []
})
export class ApiHoaPropertyModule {}
