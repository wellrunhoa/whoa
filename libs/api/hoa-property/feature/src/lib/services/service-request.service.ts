import { ServiceRequest } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, User } from '@whoa/api/core/feature';
import { ServiceRequestDTO } from '../dto/service-request.dto';

@Injectable()
export class ServiceRequestService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(serviceRequestDto: ServiceRequest, user: User, propertyId:string): Promise<ServiceRequestDTO> {

    const propertyOwner = await this.prismaService.propertyOwner.findFirst({
      where: {
         propertyId: propertyId, proprietor: { email: user.email } 
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
    
    serviceRequestDto.propertyOwnerId = propertyOwner.id;
    serviceRequestDto.createdBy = user.sub;
    serviceRequestDto.updatedBy = user.sub;
    //FIXME: Add logic to check if a similar service request was created very recently maybe with in last 1-2 mins
    console.log('serviceReq in ORM layer', serviceRequestDto);
    const newServiceRequest = await this.prismaService.serviceRequest.create({
      data: {
        ...serviceRequestDto,
      }
    });

    return newServiceRequest;
  }

  async update(serviceRequestDto: ServiceRequestDTO, user: User): Promise<ServiceRequestDTO> {
    const newProperty = await this.prismaService.serviceRequest.update({
      where: { id: serviceRequestDto.id },
      data: serviceRequestDto as ServiceRequest
    });

    return newProperty;
  }

  async getById(email: string, propertyId: string): Promise<Array<ServiceRequestDTO> | undefined> {

    //FIXME: rename propertyowner ref name in prisma file for servicerequest table
    const serviceRequests = await this.prismaService.serviceRequest.findMany({
      where: {
        propertyOwner: { propertyId: propertyId, proprietor: { email: email } }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    if (!serviceRequests) {
      throw new NotFoundException(`No ServiceRequest for property owner: ${email}`);
    }

    return serviceRequests;
  }

  // async getServiceRequestByEmail(email: string): Promise<Array<ServiceRequestDTO> | undefined> {

  // }


}
