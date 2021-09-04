import { BaseEntity } from '@whoa/api/shared/feature';
import { Entity, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
  // Do not share hashed password!
  @Column({ length: 500 })
  @Exclude()
  hashedPassword: string;

  @Column({ length: 50 })
  firstName: string;
  @Column({ length: 50 })
  middleName: string;
  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 500, nullable: true })
  imageUrl: string;

  @Column({ length: 25, nullable: true })
  phone: string;
}
