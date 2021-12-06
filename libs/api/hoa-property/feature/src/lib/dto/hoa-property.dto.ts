import { Property } from '@prisma/client';
import { IsNotEmpty } from '@whoa/api/core/feature';
import { CommunityDTO } from './community.dto';

export class HoaPropertyDTO implements Readonly<Property> {
  id: string;
  communityId: string;

  @IsNotEmpty()
  addressLine1: string;
  addressLine2: string;
  @IsNotEmpty()
  city: string;
  @IsNotEmpty()
  state: string;
  @IsNotEmpty()
  zipCode: string;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;

  community?: Partial<CommunityDTO>;
}
