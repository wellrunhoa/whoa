import { ServiceRequest } from '@prisma/client';

import { name } from '@whoa/api/core/feature';
import { PropertyOwnerDTO } from './property-owner.dto';

@name('ServiceRequest')
export class ServiceRequestDTO implements Readonly<ServiceRequest>{
    id: string;
    requestedService: string;
    comments: string;
    docsId: string;
    status: string;
    propertyOwnerId: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
   // documents: 
   propertyOwner?: Partial<PropertyOwnerDTO>;
}