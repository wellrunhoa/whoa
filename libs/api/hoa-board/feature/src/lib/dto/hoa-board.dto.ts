import { HoaBoard } from '@prisma/client';
import { IsNotEmpty, MinLength, name } from '@whoa/api/core/feature';
import { HoaBoardMemberDTO } from './hoa-board-member.dto';

@name('HoaBoard')
export class HoaBoardDTO implements Readonly<HoaBoard> {
  id: string;

  //@IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;

  members?: HoaBoardMemberDTO[];

  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
