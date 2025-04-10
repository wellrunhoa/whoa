import { Injectable } from '@nestjs/common';
import { Payment, Prisma } from '@prisma/client';
import { PrismaService, User } from '@whoa/api/core/feature';
import { classToPlain, plainToClass } from 'class-transformer';
import { PaymentDTO } from '../dto/payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async payments(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PaymentWhereUniqueInput;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithAggregationInput;
  }): Promise<PaymentDTO[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.payment
      .findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          paymentSource: true
        }
      })
      .then((payments: Payment[]) => payments.map((e) => new PaymentDTO(e)));
  }

  async create(payment: PaymentDTO, user: User): Promise<PaymentDTO> {
    console.log(payment);
    const proprietor = {
      userId: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      createdBy: user.sub,
      updatedBy: user.sub
    };
    //FIXME: Add logic to check if a matching payment source already exists
    const paymentInputData = {};

    const newPayment = await this.prisma.payment.create({
      data: {
        paymentAmount: payment.paymentAmount,
        paymentStatus: 'Scheduled',
        paymentDate: new Date(),
        paymentSource: {
          create: {
            paymentType: payment.paymentType,
            accountType: payment.accountType,
            accountNumber: payment.accountNumber,
            routingNumber: payment.routingNumber,
            accountHolderFirstname: user.given_name,
            accountHolderLastname: user.family_name,
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
