import { ApiProperty } from '@nestjs/swagger';
import { BaseDTO, ModelConverter } from '@whoa/api/shared/feature';
import { Exclude, Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { User } from '../entities/user.entity';

export class UserDTO extends BaseDTO implements Readonly<UserDTO> {
  @Exclude()
  public static MODEL_CONVERTER = new ModelConverter<UserDTO, User>(UserDTO, User);

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  middleName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  imageUrl: string;

  @ApiProperty()
  @IsEmail()
  @Transform(v => v.value.toLowerCase(), { toClassOnly: true })
  email: string;

  @ApiProperty()
  @IsPhoneNumber()
  @IsString()
  phone: string;
}
