import { ModelConverter, IsNotEmpty, MinLength } from '@whoa/api/core/feature';
import { Exclude } from 'class-transformer';
import { HoaBoard } from '../entities';
import { HoaBoardMemberDTO } from './hoa-board-member.dto';

export class HoaBoardDTO implements Readonly<HoaBoardDTO> {
  @Exclude()
  public static MODEL_CONVERTER = new ModelConverter<HoaBoardDTO, HoaBoard>(HoaBoardDTO, HoaBoard);

  //@IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  address_line1: string;

  address_line2: string;

  city: string;

  state: string;
  imageUrl: string;
  members: HoaBoardMemberDTO[];
}
