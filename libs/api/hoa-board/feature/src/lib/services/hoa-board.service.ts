import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HoaBoardDTO } from '../dto/hoa-board.dto';
import { HoaBoard } from '../entities/hoa-board';

@Injectable()
export class HoaBoardService {
  constructor(
    @InjectRepository(HoaBoard)
    private readonly repository: Repository<HoaBoard>
  ) {}

  async create(boardDto: HoaBoardDTO): Promise<HoaBoardDTO> {
    const board = HoaBoardDTO.MODEL_CONVERTER.toModel(boardDto);

    // Create new user record
    const newBoard = await this.repository.save(board);

    return HoaBoardDTO.MODEL_CONVERTER.toDTO(newBoard);
  }

  async getById(id: string): Promise<HoaBoardDTO | undefined> {
    const board = await this.repository.findOne(id);

    if (!board) {
      throw new NotFoundException(`No HOA Board with id ${id}`);
    }

    return HoaBoardDTO.MODEL_CONVERTER.toDTO(board);
  }

  async update(id: string, updateBoardDto: HoaBoardDTO): Promise<HoaBoardDTO> {
    // TODO: Consider user repository update() method

    const board = await this.repository.findOne(id);

    if (board) {
      const updatedBoard = HoaBoardDTO.MODEL_CONVERTER.toModel(updateBoardDto);

      const savedBoard = await this.repository.save(updatedBoard);

      return savedBoard;
    }
  }
}
