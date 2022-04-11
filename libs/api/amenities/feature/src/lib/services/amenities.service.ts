import { Injectable } from '@nestjs/common';
import { Amenity, Prisma, Reservation } from '@prisma/client';
import { PrismaService, User } from '@whoa/api/core/feature';
import { ReservationDTO } from '../dto/reservation.dto';

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

  async updateAmenity(params: { where: Prisma.AmenityWhereUniqueInput; data: Prisma.AmenityUpdateInput }): Promise<Amenity> {
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

  async upcomingReservations(communityId: string, user: User): Promise<any[]> {
    return this.prisma.reservation.findMany({
      where: {
        startTime: {
          gte: new Date()
        },
        proprietor: { email: user.email },
        community: { communityId: communityId }
      },
      include: {
        community: {
          include: {
            amenity: {
              select: {
                amenityName: true
              }
            }
          }
        }
      }
    });
  }

  async createReservation(dto: ReservationDTO, user: User): Promise<ReservationDTO> {
    const reservation = { ...dto };
    if (!reservation.communityAmenityId) {
      const communityAmenity = await this.prisma.communityAmenity.findFirst({
        where: {
          communityId: reservation.communityId,
          amenityId: reservation.amenityId
        }
      });
      reservation.communityAmenityId = communityAmenity.id;
    }
    //proprietorId
    if (!reservation.proprietorId) {
      const proprietor = await this.prisma.proprietor.findFirst({
        where: {
          email: user.email
        }
      });
      reservation.proprietorId = proprietor.id;
    }
    delete reservation.communityId;
    delete reservation.amenityId;
    delete reservation.amenityName;
    reservation.createdBy = user.sub;
    reservation.updatedBy = user.sub;
    const newReservation = await this.prisma.reservation.create({
      data: { ...reservation }
    });

    return { ...reservation, ...newReservation };
  }

  async updateReservation(reservation: ReservationDTO, user: User): Promise<ReservationDTO> {
    if (!reservation.communityAmenityId) {
      const communityAmenity = await this.prisma.communityAmenity.findFirst({
        where: {
          communityId: reservation.communityId,
          amenityId: reservation.amenityId
        }
      });
      reservation.communityAmenityId = communityAmenity.id;
    }
    reservation.updatedBy = user.sub;
    const newReservation = await this.prisma.reservation.update({
      data: reservation,
      where: {
        id: reservation.id
      }
    });

    return { ...reservation, ...newReservation };
  }

  async deleteReservation(id: string) {
    await this.prisma.reservation.delete({
      where: { id: id }
    });
  }
}
