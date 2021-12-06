import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@whoa/api/core/feature';
import { CommunityDTO } from '../dto/community.dto';
import { HoaBoardMemberDTO } from '../dto/hoa-board-member.dto';
import { HoaBoardDTO } from '../dto/hoa-board.dto';

@Injectable()
export class HoaBoardService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(boardDto: HoaBoardDTO): Promise<HoaBoardDTO> {
    // Create new user record
    const newBoard = await this.prismaService.hoaBoard.create({
      data: boardDto
    });

    return newBoard;
  }

  async getById(id: string): Promise<HoaBoardDTO | undefined> {
    const board = await this.prismaService.hoaBoard.findFirst({ where: { id } });

    if (!board) {
      throw new NotFoundException(`No HOA Board with id ${id}`);
    }

    return board;
  }

  async update(id: string, updateBoardDto: HoaBoardDTO): Promise<HoaBoardDTO> {
    const savedBoard = await this.prismaService.hoaBoard.update({
      data: updateBoardDto,
      where: { id }
    });

    return savedBoard;
  }

  // async addMember(memberDto: HoaBoardMemberDTO): Promise<HoaBoardMemberDTO> {
  //   return await this.prismaService.hoaBoardMember.create({
  //     data: memberDto
  //   });
  // }

  async getCommunitiesBasic(name: string): Promise<CommunityDTO[] | undefined> {
    const communities = await this.prismaService.community.findMany({
      where: { name: { contains: name, mode: 'insensitive' } }
    });

    return communities;
  }
}
