import { Proprietor } from '@prisma/client';
import { name } from '@whoa/api/core/feature';  

@name('Proprietor')
export class ProprietorDTO implements Readonly<Proprietor> {
  id:         string;   
  firstName:  string;
  middleName: string;
  lastName:   string;
  email:      string;
  phone:      string;
  userId:     string;
  createdAt:  Date;
  createdBy:  string;
  updatedAt:  Date;
  updatedBy:  string;
}