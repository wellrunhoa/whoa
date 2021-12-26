import { HoaBoardMember } from '@prisma/client';
import { HoaBoardDTO } from './hoa-board.dto';
import { name } from '@whoa/api/core/feature';

@name('HoaBoardMember')
export class HoaBoardMemberDTO implements Readonly<HoaBoardMember> {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phone: string;
  hoaBoardId: string;
  hoaBoard: HoaBoardDTO;
  createdAt: Date;
  createdBy: string;
  updatedAt: Date;
  updatedBy: string;
}
