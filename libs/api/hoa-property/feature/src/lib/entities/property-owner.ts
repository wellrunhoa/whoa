import { BaseEntity } from '@whoa/api/core/feature';
import { Entity, Column, ManyToMany } from 'typeorm';
import { Property } from './property';

@Entity()
export class PropertyOwner extends BaseEntity {
  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50, nullable: true })
  middleName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ length: 100, nullable: true })
  email: string;

  @Column({ length: 25, nullable: true })
  phone: string;

  @ManyToMany(() => Property, (board) => board.owners)
  property: Property[];
}
