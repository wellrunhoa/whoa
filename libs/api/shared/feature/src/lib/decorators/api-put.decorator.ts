import { applyDecorators, ClassSerializerInterceptor, Put, UseInterceptors } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation
} from '@nestjs/swagger';

import { ApiValidateErrorResponse } from './api-validation-error-response.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiPut(type: any, path?: string | string[]) {
  return applyDecorators(
    Put(path),
    ApiOperation({
      summary: `Update an existing ${type.name}`,
      description: `Expects a full ${type.name}`
    }),
    ApiOkResponse({ type: type, description: `${type.name} updated` }),
    ApiNotFoundResponse({
      description: `${type.name} not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    ApiValidateErrorResponse(),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
