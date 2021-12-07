import { Property } from '@whoa/web/core/data-access';

export interface HoaProperty extends Property {
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
