import { applyDecorators, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { getName } from './typename.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiGetOne(type: any, path?: string | string[]) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: `Get an existing ${getName(type)}` }),
    ApiOkResponse({ description: `Return a single ${getName(type)}`, type }),
    ApiNotFoundResponse({ description: `${getName(type)} not found` }),
    ApiBadRequestResponse({ description: 'Invalid identifier supplied' })
  );
}
