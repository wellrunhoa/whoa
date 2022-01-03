import { name } from '@whoa/api/core/feature';

@name('User')
export class UserDTO {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
}
