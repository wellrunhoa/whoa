import { ApiProperty } from '@nestjs/swagger';
import { ModelConverter } from '@whoa/api/shared/feature';
import { Exclude } from 'class-transformer';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
import { User } from '../entities/user.entity';
import { UserDTO } from './user.dto';

export class CreateUserDTO extends UserDTO implements Readonly<CreateUserDTO> {
  @Exclude()
  public static MODEL_CONVERTER = new ModelConverter<CreateUserDTO, User>(CreateUserDTO, User);

  @ApiProperty()
  @Exclude()
  @IsString()
  @IsNotEmpty()
  @MinLength(12)
  password: string;
}
