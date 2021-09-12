import { ModelConverter } from '@whoa/api/shared/feature';
import { Exclude } from 'class-transformer';
import { HoaBoard } from '../entities';
import { HoaBoardMemberDTO } from './hoa-board-member.dto';

export class HoaBoardDTO {
  @Exclude()
  public static MODEL_CONVERTER = new ModelConverter<HoaBoardDTO, HoaBoard>(HoaBoardDTO, HoaBoard);

  name: string;

  address_line1: string;

  address_line2: string;

  city: string;

  state: string;
  imageUrl: string;
  members: HoaBoardMemberDTO[];
}
