import { Reservation } from '@prisma/client';
import { IsNotEmpty } from '@whoa/api/core/feature';
import { name } from '@whoa/api/core/feature';

@name('Reservation')
export class ReservationDTO implements Readonly<Reservation> {
  id: string;

  @IsNotEmpty()
  communityId: string;
  @IsNotEmpty()
  amenityId: string;
  amenityName?: string;
  communityAmenityId: string;
  proprietorId: string;

  @IsNotEmpty()
  startTime: Date;
  @IsNotEmpty()
  endTime: Date;

  paymentToken: string;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
