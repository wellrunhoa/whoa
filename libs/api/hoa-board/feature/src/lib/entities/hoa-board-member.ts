import { BaseEntity } from '@whoa/api/shared/feature';
import { Entity, Column, ManyToOne } from 'typeorm';
import { HoaBoard } from './hoa-board';

@Entity()
export class HoaBoardMember extends BaseEntity {
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

  @ManyToOne(() => HoaBoard, (board) => board.members)
  hoaBoard: HoaBoard;
}
