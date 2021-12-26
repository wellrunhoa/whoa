import { applyDecorators, ClassSerializerInterceptor, Put, UseInterceptors } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { ApiValidateErrorResponse } from './api-validation-error-response.decorator';
import { getName } from './typename.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiPut(type: any, path?: string | string[]) {
  return applyDecorators(
    Put(path),
    ApiOperation({
      summary: `Update an existing ${getName(type)}`,
      description: `Expects a full ${getName(type)}`
    }),
    ApiOkResponse({ type: type, description: `${getName(type)} updated` }),
    ApiNotFoundResponse({
      description: `${getName(type)} not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    ApiValidateErrorResponse(),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
