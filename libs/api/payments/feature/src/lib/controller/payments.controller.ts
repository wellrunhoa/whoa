import { Payment, PaymentSource,Prisma } from '.prisma/client';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {PaymentsService} from '../services/payments.service';
import { ApiGetAll, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { PaymentDTO } from '../..';

@Controller('payments')
export class PaymentsController {

    constructor(private readonly paymentsService: PaymentsService) {}

    @ApiGetAll('scheduledPayments/:id')
    async getPayments(@Param('id') proprietorId: string): Promise<Payment[]> {
        return this.paymentsService.payments({
          where: { paymentSource: {proprietorId:proprietorId} }
        });
      }

      @ApiPost(PaymentDTO)
      //@Scopes('manage')
      async create(@Body() paymentDto: PaymentDTO, @UserParam() user: User): Promise<PaymentDTO> {
         return this.paymentsService.create(paymentDto, user);
      }

}

