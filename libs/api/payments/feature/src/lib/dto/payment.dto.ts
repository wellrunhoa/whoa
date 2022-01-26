import { Payment } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { name } from '@whoa/api/core/feature';
import { Transform } from 'class-transformer';

@name('Payment')
export class PaymentDTO implements Readonly<Payment> {
  id: string;
  paymentSourceId: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  paymentType: string;
  routingNumber: string;
  accountNumber: string;
  accountType: string;
  cardNumber: string;
  expDate: string;
  cardCode: string;
  cardType: string;
  accountHolderFirstName: string;
  accountHolderLastName: string;
  accountHolderAddress: string;
  accountHolderCity: string;
  accountHolderState: string;
  accountHolderZip: string;
  paymentId: string;
  paymentDay: string;
  paymentDate: Date;
  paymentStatus: string;
  @Transform(({ value }) => value.toFixed(2, Decimal.ROUND_HALF_UP), { toPlainOnly: true })
  paymentAmount: Decimal;

  constructor(partial: Partial<Payment>) {
    Object.assign(this, partial);
  }
}
