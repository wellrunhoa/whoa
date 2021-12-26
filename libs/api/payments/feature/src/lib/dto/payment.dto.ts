import { Payment } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import { name } from '@whoa/api/core/feature';

@name('Payment')
export class PaymentDTO implements Readonly<Payment> {
  id: string;
  paymentSourceId: string;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
  paymentType: string;
  paymentAmount: Decimal;
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
}
