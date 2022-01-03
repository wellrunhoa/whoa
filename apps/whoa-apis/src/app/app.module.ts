import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { ApiAmenitiesModule } from '@whoa/api/amenities/feature';
import { ApiHoaPropertyModule } from '@whoa/api/hoa-property/feature';
import { ApiHoaBoardModule } from '@whoa/api/hoa-board/feature';
import { ApiDocumentsModule } from '@whoa/api/documents/feature';
import { ApiPaymentsFeatureModule } from '@whoa/api/payments/feature';
import { ApiPassportModule } from '@whoa/api/passport/feature';

@Module({
  imports: [
    ApiCoreModule,
    ApiDocumentsModule,
    ApiAmenitiesModule,
    ApiPaymentsFeatureModule,
    ApiHoaPropertyModule,
    ApiHoaBoardModule,
    ApiPassportModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
