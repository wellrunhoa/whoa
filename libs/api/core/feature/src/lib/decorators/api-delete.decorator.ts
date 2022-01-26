import { applyDecorators, Delete } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { getName } from './typename.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiDelete(type: any, path?: string | string[]) {
  return applyDecorators(
    Delete(path),
    ApiOperation({
      summary: `Delete an existing ${getName(type)}`
    }),
    ApiOkResponse({ type: type, description: `${getName(type)} deleted` }),
    ApiNotFoundResponse({
      description: `${getName(type)} not found`
    }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' })
  );
}
