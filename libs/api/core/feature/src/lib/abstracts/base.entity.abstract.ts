// import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

// export abstract class BaseEntity {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column({ type: 'boolean', default: true })
//   active: boolean;

//   @Column({ type: 'boolean', default: false })
//   archived: boolean;

//   @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;

//   @Column({ type: 'varchar', length: 300 })
//   createdBy: string;

//   @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
//   lastChangeAt: Date;

//   @Column({ type: 'varchar', length: 300 })
//   lastChangeBy: string;

//   @Column({ type: 'varchar', length: 300, nullable: true })
//   internalComment: string | null;
// }
