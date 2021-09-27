import { BaseEntity } from '@whoa/api/core/feature';
import { Entity, Column } from 'typeorm';

@Entity()
export class Document extends BaseEntity {
  @Column({ length: 150 })
  title: string;

  @Column({ length: 150 })
  documentType: string;

  @Column({ length: 1000 })
  documentPath: string;
}
