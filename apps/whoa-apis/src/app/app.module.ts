import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { ApiAmenitiesModule } from "@whoa/api/amenities/feature";
import { ApiHoaBoardModule } from '@whoa/api/hoa-board/feature';
import { ApiDocumentsModule } from "@whoa/api/documents/feature";
import {ApiPaymentsFeatureModule} from '@whoa/api/payments/feature';

@Module({
  imports: [ApiCoreModule, ApiDocumentsModule, ApiAmenitiesModule, ApiPaymentsFeatureModule],
  controllers: [],
  providers: []
})
export class AppModule {}
