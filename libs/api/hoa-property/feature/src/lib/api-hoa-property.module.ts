import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { HoaPropertyService } from './services/hoa-property.service';
import { HoaPropertyController } from './controllers/hoa-property.controller';

@Module({
  imports: [ApiCoreModule],
  controllers: [HoaPropertyController],
  providers: [HoaPropertyService],
  exports: []
})
export class ApiHoaPropertyModule {}
