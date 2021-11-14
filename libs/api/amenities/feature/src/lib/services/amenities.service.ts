import { Injectable } from '@nestjs/common';
import { Amenity, Prisma } from '@prisma/client';
import { PrismaService } from '@whoa/api/core/feature';

@Injectable()
export class AmenitiesService {
  constructor(private prisma: PrismaService) {}

  async amenity(postWhereUniqueInput: Prisma.AmenityWhereUniqueInput): Promise<Amenity | null> {
    return this.prisma.amenity.findUnique({
      where: postWhereUniqueInput
    });
  }

  async amenities(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.AmenityWhereUniqueInput;
    where?: Prisma.AmenityWhereInput;
    orderBy?: Prisma.AmenityOrderByWithAggregationInput;
  }): Promise<Amenity[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.amenity.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    });
  }

  async createAmenity(data: Prisma.AmenityCreateInput): Promise<Amenity> {
    return this.prisma.amenity.create({
      data
    });
  }

  async updateAmenity(params: {
    where: Prisma.AmenityWhereUniqueInput;
    data: Prisma.AmenityUpdateInput;
  }): Promise<Amenity> {
    const { data, where } = params;
    return this.prisma.amenity.update({
      data,
      where
    });
  }

  async deleteAmenity(where: Prisma.AmenityWhereUniqueInput): Promise<Amenity> {
    return this.prisma.amenity.delete({
      where
    });
  }
  
}
