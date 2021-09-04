
import { SetMetadata } from '@nestjs/common';

export const IS_UNSECURED_KEY = 'isUnsecured';
export const Unsecured = () => SetMetadata(IS_UNSECURED_KEY, true);