import { applyDecorators, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import {
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ApiValidateErrorResponse } from '.';
import { ApiPublicError } from '../models/api-public-error.model';
import { fileMimetypeFilter } from '../files/file-mimetype-filter';

export function ApiFile(
  path?: string | string[],
  fieldName = 'file',
  required = false,
  localOptions?: MulterOptions
) {
  return applyDecorators(
    Post(path),
    UseInterceptors(FileInterceptor(fieldName, localOptions)),
    ApiOperation({ summary: 'Upload a file' }),
    ApiConsumes('multipart/form-data'),
    ApiBody({
      schema: {
        type: 'object',
        required: required ? [fieldName] : [],
        properties: {
          [fieldName]: {
            type: 'string',
            format: 'binary'
          }
        }
      }
    }),
    ApiCreatedResponse({
      description: 'The file has been successfully uploaded.'
    }),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      type: ApiPublicError
    }),
    ApiInternalServerErrorResponse({
      description: 'Uknown error while processing the request',
      type: ApiPublicError
    }),
    ApiValidateErrorResponse()
  );
}

export function ApiImageFile(path?: string | string[], fileName = 'image', required = false) {
  return ApiFile(path, fileName, required, {
    fileFilter: fileMimetypeFilter('image')
  });
}

export function ApiPdfFile(path?: string | string[], fileName = 'image', required = false) {
  return ApiFile(path, fileName, required, {
    fileFilter: fileMimetypeFilter('pdf')
  });
}

export function ApiMimeTypeFile(
  path?: string | string[],
  fileName = 'image',
  required = false,
  ...mimetypes: string[]
) {
  return ApiFile(path, fileName, required, {
    fileFilter: fileMimetypeFilter(...mimetypes)
  });
}
