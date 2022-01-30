import { Property } from '.prisma/client';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService, User } from '@whoa/api/core/feature';
import { HoaPropertyDTO } from '../dto/hoa-property.dto';

@Injectable()
export class HoaPropertyService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(propertyDto: Property, user: User): Promise<HoaPropertyDTO> {
    const proprietor = {
      userId: user.sub,
      email: user.email,
      firstName: user.given_name,
      lastName: user.family_name,
      createdBy: user.sub,
      updatedBy: user.sub
    };
    //FIXME: Add logic to check if property exists with address
    const newProperty = await this.prismaService.property.create({
      data: {
        ...propertyDto,
        PropertyOwner: {
          create: [
            {
              createdBy: user.sub,
              updatedBy: user.sub,
              proprietor: {
                connectOrCreate: {
                  where: { email: user.email },
                  create: proprietor
                }
              }
            }
          ]
        }
      }
    });

    return newProperty;
  }

  async getById(id: string): Promise<HoaPropertyDTO | undefined> {
    const board = await this.prismaService.property.findFirst({ where: { id } });

    if (!board) {
      throw new NotFoundException(`No Property with id ${id}`);
    }

    return board;
  }

  async getPropertiesByEmail(email: string): Promise<Array<HoaPropertyDTO> | undefined> {
    return await this.prismaService.property.findMany({
      where: {
        PropertyOwner: {
          every: { proprietor: { email: email } }
        }
      },
      include: {
        community: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });
  }

  async getDefaultPropertyByOwner(email: string): Promise<HoaPropertyDTO | undefined> {
    let property = await this.prismaService.property.findFirst({
      where: {
        PropertyOwner: {
          every: { proprietor: { email: email }, propertyDefault: 'Y' }
        }
      },
      include: {
        community: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!property) {
      property = await this.prismaService.property.findFirst({
        where: {
          PropertyOwner: {
            every: { proprietor: { email: email } }
          }
        },
        include: {
          community: {
            select: {
              id: true,
              name: true
            }
          }
        },
        orderBy: {
          createdAt: 'asc'
        }
      });
    }

    if (!property) {
      throw new NotFoundException('No Default Property found');
    }

    return property;
  }

  // async update(id: string, updateBoardDto: HoaPropertyDTO): Promise<HoaPropertyDTO> {
  //   const savedBoard = await this.prismaService.hoaBoard.update({
  //     data: updateBoardDto,
  //     where: { id }
  //   });

  //   return savedBoard;
  // }

  // async addMember(memberDto: HoaBoardMemberDTO): Promise<HoaBoardMemberDTO> {
  //   return await this.prismaService.hoaBoardMember.create({
  //     data: memberDto
  //   });
  // }
}
