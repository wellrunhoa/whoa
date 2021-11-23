import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PrismaService } from '@whoa/api/core/feature';

@Injectable()
export class PaymentsService {
    constructor(private prisma: PrismaService) {}

    async payments(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.PaymentWhereUniqueInput;
        where?: Prisma.PaymentWhereInput;
        orderBy?: Prisma.PaymentOrderByWithAggregationInput;
      }): Promise<Payment[]> {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.payment.findMany({
          skip,
          take,
          cursor,
          where,
          orderBy
        });
      }

}
