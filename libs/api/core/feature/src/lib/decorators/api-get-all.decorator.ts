import { applyDecorators, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { getName } from './typename.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiGetAll(type: any, path?: string | string[]) {
  return applyDecorators(
    Get(path),
    ApiOperation({ summary: `Get all ${getName(type)}s` }),
    ApiOkResponse({ description: `Return a list of all ${getName(type)}s` })
  );
}
