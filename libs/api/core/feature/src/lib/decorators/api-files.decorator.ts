import { applyDecorators, Post, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ApiBody, ApiConsumes, ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ApiValidateErrorResponse } from '.';

export function ApiFiles(
  path?: string | string[],
  fieldName = 'files',
  required = false,
  maxCount = 10,
  localOptions?: MulterOptions
) {
  return applyDecorators(
    Post(path),
    ApiOperation({ summary: `Upload multiple files` }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'array',
            items: {
              type: 'string',
              format: 'binary'
            }
          }
        }
      }
    }),
    ApiCreatedResponse({
      description: 'The files has been successfully uploaded.'
    }),
    ApiUnauthorizedResponse(),
    ApiValidateErrorResponse(),
    UseInterceptors(FilesInterceptor(fieldName, maxCount, localOptions))
  );
}
