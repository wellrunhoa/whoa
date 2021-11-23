import { Payment, PaymentSource,Prisma } from '.prisma/client';
import { Controller, Get, Param } from '@nestjs/common';
import {PaymentsService} from '../services/payments.service';

@Controller('payments')
export class PaymentsController {

    constructor(private readonly paymentsService: PaymentsService) {}

    @Get('payments/:id')
    async getPayments(@Param('id') proprietorId: string): Promise<Payment[]> {
        return this.paymentsService.payments({
          where: { paymentSource: {proprietorId:proprietorId} }
        });
      }

}
