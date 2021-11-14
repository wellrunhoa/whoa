import { Amenity, CommunityAmenity, Prisma } from '.prisma/client';
import { Controller, Get, Param } from '@nestjs/common';
import { AmenitiesService } from '../services/amenities.service';

@Controller('amenities')
export class AmenitiesController {
  constructor(private readonly amenitiesService: AmenitiesService) {}

  @Get('community/:id')
  async getComminityAmenities(@Param('id') communityId: string): Promise<Amenity[]> {
    return this.amenitiesService.amenities({
      where: { communityAmenities: { every: { communityId: communityId } } }
    });
    // return this.postService.posts({
    //   where: {
    //     OR: [
    //       {
    //         title: { contains: searchString },
    //       },
    //       {
    //         content: { contains: searchString },
    //       },
    //     ],
    //   },
    // });
  }
}
