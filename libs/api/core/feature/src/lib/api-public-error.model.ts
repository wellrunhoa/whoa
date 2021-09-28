/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { FieldError } from './validation/field-error.model';

export class ApiPublicError implements Readonly<ApiPublicError> {
  @ApiProperty()
  statusCode: HttpStatus;
  @ApiProperty()
  message?: string;
  @ApiProperty()
  status?: string;
  @ApiProperty()
  errorName?: string;
  @ApiProperty({ type: [FieldError] })
  errors?: Array<FieldError>;
  @ApiProperty()
  timestamp?: string;
  @ApiProperty()
  path?: string;
  @ApiProperty()
  stack?: string;

  constructor(
    path: string,
    statusCode: HttpStatus,
    message: string,
    errorName?: string,
    errors?: FieldError[],
    stack?: string
  ) {
    this.timestamp = new Date().toISOString();
    this.statusCode = statusCode;
    this.status = HttpStatus[statusCode];
    this.path = path;
    this.message = message;
    this.errorName = errorName;
    this.errors = errors;
    this.stack = stack;
  }
}
