import { ValidationError } from 'class-validator';
import { FieldError } from './field-error.model';
import { ValidationException } from './validation-exception.model';

export function ValidationExceptionFactory(errors: ValidationError[]) {
  const mappedErrors: FieldError[] = [];
  
  errors.map((error) => {
    Object.entries(error.constraints).forEach((constraint) => {
      mappedErrors.push(JSON.parse(constraint[1]));
    });
  });

  throw new ValidationException(mappedErrors);
}
