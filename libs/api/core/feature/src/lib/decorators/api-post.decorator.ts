import { applyDecorators, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';

import { ApiValidateErrorResponse } from './api-validation-error-response.decorator';
import { getName } from './typename.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiPost(type: any, path?: string | string[]) {
  return applyDecorators(
    Post(path),
    ApiOperation({ summary: `Create a new ${getName(type)}` }),
    ApiCreatedResponse({
      description: `The ${getName(type)} has been successfully created.`,
      type
    }),
    ApiUnauthorizedResponse(),
    ApiValidateErrorResponse()
  );
}
