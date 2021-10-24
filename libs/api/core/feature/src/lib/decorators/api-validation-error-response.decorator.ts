import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ApiPublicError } from '../models/api-public-error.model';

export const ApiValidateErrorResponse = () => {
  return applyDecorators(
    ApiResponse({
      description: 'Some validation error as accured on the given model',
      status: 422,
      type: ApiPublicError
    })
  );
};