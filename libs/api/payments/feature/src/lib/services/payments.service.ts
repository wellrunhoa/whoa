import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PrismaService, User } from '@whoa/api/core/feature';
import { PaymentDTO } from '../dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) { }

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
      orderBy,
      include: {
        paymentSource: true
      },
    });
  }

  async create(payment: PaymentDTO, user: User): Promise<PaymentDTO> {
    const proprietor = {
      userId: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      createdBy: user.sub,
      updatedBy: user.sub
    };
    //FIXME: Add logic to check if a matching payment source already exists
    const paymentInputData = {

    };

    const newPayment = await this.prisma.payment.create({
      data: {
        paymentAmount: payment.paymentAmount,
        paymentStatus: payment.paymentStatus,
        paymentDate: payment.paymentDate,
        paymentSource: {
          create:
          {
            paymentType: payment.paymentType,
            accountType: payment.accountType,
            accountNumber: payment.accountNumber,
            routingNumber: payment.routingNumber,
            accountHolderFirstname: payment.accountHolderFirstName,
            accountHolderLastname: payment.accountHolderLastName,
            createdBy: user.sub,
            updatedBy: user.sub,
            proprietor: {
              connectOrCreate: {
                where: { email: user.email },
                create: proprietor
              }
            }
          }
        },
        createdBy: user.sub,
        updatedBy: user.sub
      }
    });

    return payment;
  }

}
