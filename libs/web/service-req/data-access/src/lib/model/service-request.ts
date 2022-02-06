export interface ServiceRequest {
    id: string;
    requestedService: string;
    comments: string;
    status: string;
    propertyOwnerId: string;
    createdAt: Date;
    createdBy: string;
    updatedAt: Date;
    updatedBy: string;
   // documents: 
}