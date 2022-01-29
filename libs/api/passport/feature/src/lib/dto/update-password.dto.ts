import { name } from '@whoa/api/core/feature';

@name('UpdatePassword')
export class UpdatePasswordDTO {
  currentPassword: string;
  newPassword: string;
  confirmation: string;
}
