import { ApiProperty } from '@nestjs/swagger';

export class FieldError implements Readonly<FieldError> {
  @ApiProperty()
  key: string;
  @ApiProperty()
  field?: string;
  @ApiProperty()
  data?: unknown;

  constructor(partial: Partial<FieldError> = {}) {
    Object.assign(this, partial);
  }
}
