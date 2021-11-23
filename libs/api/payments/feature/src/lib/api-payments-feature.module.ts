import { Module } from '@nestjs/common';
import { ApiCoreModule } from '@whoa/api/core/feature';
import { PaymentsService } from './services/payments.service';
import { PaymentsController } from './controller/payments.controller';

@Module({
  imports: [ApiCoreModule],
  controllers: [PaymentsController],
  providers: [PaymentsService],
  exports: []
})
export class ApiPaymentsFeatureModule {}
