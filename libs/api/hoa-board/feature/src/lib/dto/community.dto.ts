import { Community } from '@prisma/client';

export class CommunityDTO implements Readonly<Community> {
  id: string;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  imageUrl: string;
  hoaBoardId: string;

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
