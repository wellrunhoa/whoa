import { applyDecorators, ClassSerializerInterceptor, Post, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

import { ApiValidateErrorResponse } from './api-validation-error-response.decorator';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ApiPost(type: any, path?: string | string[]) {
  return applyDecorators(
    Post(path),
    ApiOperation({ summary: `Create a new ${type.name}` }),
    ApiCreatedResponse({
      description: `The ${type.name} has been successfully created.`,
      type
    }),
    ApiValidateErrorResponse(),
    UseInterceptors(ClassSerializerInterceptor)
  );
}
