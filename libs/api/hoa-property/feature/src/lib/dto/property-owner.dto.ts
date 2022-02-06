import { PropertyOwner } from '@prisma/client';
import { name } from '@whoa/api/core/feature'; 
import {HoaPropertyDTO} from './hoa-property.dto';
import {ProprietorDTO} from './proprietor.dto';

@name('PropertyOwner')
export class PropertyOwnerDTO implements Readonly<PropertyOwner> {
  id:              string;     
  proprietor?: Partial<ProprietorDTO>;
  proprietorId:    string;
  property?: Partial<HoaPropertyDTO>;
  propertyId:      string;
  propertyDefault: string;
  endDate:         Date;
  createdAt:       Date;
  createdBy:       string;
  updatedAt:       Date;
  updatedBy:       string;
}