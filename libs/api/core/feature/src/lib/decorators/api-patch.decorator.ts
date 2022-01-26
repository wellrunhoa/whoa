import { applyDecorators, Patch } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

import { ApiValidateErrorResponse } from './api-validation-error-response.decorator';
import { getName } from './typename.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiPatch(type: any, path?: string | string[]) {
  return applyDecorators(
    Patch(path),
    ApiOperation({
      summary: `Update an existing ${getName(type)}`,
      description: `Expects a partial ${getName(type)}`
    }),
    ApiOkResponse({ type: type, description: `${getName(type)} updated` }),
    ApiNotFoundResponse({
      description: `${getName(type)} not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' }),
    ApiValidateErrorResponse()
  );
}
