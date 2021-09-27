import { HttpException, HttpStatus } from '@nestjs/common';
import { FieldError } from './field-error.model';

export class ValidationException extends HttpException {
  constructor(errors: FieldError[]) {
    super({ message: 'validation.failed', errors: errors }, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
