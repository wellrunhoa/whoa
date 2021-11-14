import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { AmenitiesService } from './services/amenities.service';
import { AmenitiesController } from './controllers/amenities.controller';

@Module({
  imports: [ApiCoreModule],
  controllers: [AmenitiesController],
  providers: [AmenitiesService],
  exports: []
})
export class ApiAmenitiesModule {}
