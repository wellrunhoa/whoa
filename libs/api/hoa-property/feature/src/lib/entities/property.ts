import { BaseEntity } from '@whoa/api/core/feature';
import { Entity, Column, OneToMany, ManyToMany } from 'typeorm';
import { PropertyOwner } from './property-owner';

@Entity()
export class Property extends BaseEntity {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 50 })
  address_line1: string;

  @Column({ length: 50, nullable: true })
  address_line2: string;

  @Column({ length: 50 })
  city: string;

  @Column({ length: 50 })
  state: string;

  @Column({ length: 500, nullable: true })
  imageUrl: string;

  @ManyToMany(() => PropertyOwner, (owner) => owner.property)
  owners: PropertyOwner[];
}
