import { ModelConverter } from '@whoa/api/shared/feature';
import { Exclude } from 'class-transformer';
import { User } from '../entities/user.entity';
import { UserDTO } from './user.dto';

export class UpdateUserDTO extends UserDTO implements Readonly<UpdateUserDTO> {
  @Exclude()
  public static MODEL_CONVERTER = new ModelConverter<UpdateUserDTO, User>(UpdateUserDTO, User);
}
