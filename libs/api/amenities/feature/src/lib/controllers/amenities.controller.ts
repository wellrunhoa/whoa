import { Amenity } from '.prisma/client';
import { Body, Controller, Get, Param } from '@nestjs/common';
import { Reservation } from '@prisma/client';
import { ApiGetAll, ApiPost, User, UserParam } from '@whoa/api/core/feature';
import { ReservationDTO } from '../dto/reservation.dto';
import { AmenitiesService } from '../services/amenities.service';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get('community/:id')
  async getComminityAmenities(@Param('id') communityId: string): Promise<Amenity[]> {
    return this.amenitiesService.amenities({
      where: { communityAmenities: { every: { communityId: communityId } } }
    });
  }

  @ApiPost(ReservationDTO, 'reservation')
  //@Scopes('manage')
  createReservation(@Body() reservation: ReservationDTO, @UserParam() user: User): Promise<ReservationDTO> {
    console.log('reservation in controller', reservation);
    return this.amenitiesService.createReservation(reservation, user);
  }

  @ApiGetAll(ReservationDTO, 'reservations/upcoming/:id')
  //@Scopes('manage')
  upcomingReservations(@Param('id') communityId: string, @UserParam() user: User): Promise<any[]> {
    return this.amenitiesService.upcomingReservations(communityId, user);
  }
}
