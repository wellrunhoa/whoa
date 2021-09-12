import { ModelConverter } from '@whoa/api/shared/feature';
import { Exclude } from 'class-transformer';
import { HoaBoardMember } from '../entities';

export class HoaBoardMemberDTO {
  @Exclude()
  public static MODEL_CONVERTER = new ModelConverter<HoaBoardMemberDTO, HoaBoardMember>(
    HoaBoardMemberDTO,
    HoaBoardMember
  );

  firstName: string;

  middleName: string;

  lastName: string;

  email: string;
  phone: string;
}
