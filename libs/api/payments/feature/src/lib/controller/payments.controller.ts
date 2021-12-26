import { Payment } from '.prisma/client';
import { Body, Controller, Param } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { ApiGetAll, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { PaymentDTO } from '../dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiGetAll(PaymentDTO, 'scheduledPayments/:id')
  getPayments(@Param('id') proprietorId: string): Promise<Payment[]> {
    return this.paymentsService.payments({
      where: { paymentSource: { proprietorId: proprietorId } }
    });
  }

  @ApiPost(PaymentDTO)
  //@Scopes('manage')
  create(@Body() paymentDto: PaymentDTO, @UserParam() user: User): Promise<PaymentDTO> {
    return this.paymentsService.create(paymentDto, user);
  }
}
