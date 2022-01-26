import { Payment } from '.prisma/client';
import { Body, ClassSerializerInterceptor, Controller, Param, UseInterceptors } from '@nestjs/common';
import { PaymentsService } from '../services/payments.service';
import { ApiGetAll, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { PaymentDTO } from '../dto/payment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @ApiPost(PaymentDTO)
  //@Scopes('manage')
  create(@Body() paymentDto: PaymentDTO, @UserParam() user: User): Promise<PaymentDTO> {
    console.log('create payment end point invoked');
    return this.paymentsService.create(paymentDto, user);
  }

  @ApiGetAll(PaymentDTO, 'scheduledPayments')
  //@Scopes('view')
  getPayments(@UserParam() user: User): Promise<PaymentDTO[]> {
    return this.paymentsService.payments({
      where: { paymentSource: { proprietor: { userId: user.sub } } }
    });
  }
}
