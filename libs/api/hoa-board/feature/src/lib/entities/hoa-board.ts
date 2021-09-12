import { BaseEntity } from '@whoa/api/shared/feature';
import { Entity, Column, OneToMany } from 'typeorm';
import { HoaBoardMember } from './hoa-board-member';

@Entity()
export class HoaBoard extends BaseEntity {
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

  @OneToMany(() => HoaBoardMember, (member) => member.hoaBoard)
  members: HoaBoardMember[];
}
