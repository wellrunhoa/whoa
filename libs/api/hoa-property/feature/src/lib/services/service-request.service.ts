import { ServiceRequest } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, User } from '@whoa/api/core/feature';
import { ServiceRequestDTO } from '../dto/service-request.dto';

@Injectable()
export class ServiceRequestService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(serviceRequestDto: ServiceRequest, user: User): Promise<ServiceRequestDTO> {
   
   //FIXME: Add logic to check if property exists with address
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

  async getById(email: string): Promise<Array<ServiceRequestDTO> | undefined> {

    //FIXME: rename propertyowner ref name in prisma file for servicerequest table
    const serviceRequests = await this.prismaService.serviceRequest.findMany({ 
        where: {
          proprietor: {
            every: { Proprietor: { email: email } }
          }
      },
      orderBy: {
        createdAt: 'asc'
      } });

    if (!serviceRequests) {
      throw new NotFoundException(`No ServiceRequest for property owner: ${email}`);
    }

    return serviceRequests;
  }

  // async getServiceRequestByEmail(email: string): Promise<Array<ServiceRequestDTO> | undefined> {
  
  // }


}
