import { Entity, Column, UpdateDateColumn } from 'typeorm';

import { DocumentStatus } from 'src/constant';

import { BaseEntity } from 'src/document-approval/infra/persistence/entity/BaseEntity';

@Entity()
export class DocumentEntity extends BaseEntity {
  @Column('varchar', { length: 120 })
  public title: string;

  @Column('varchar', { length: 120 })
  public category: string;

  @Column('varchar', { length: 120 })
  public content: string;

  @Column('varchar', { length: 60 })
  public status: DocumentStatus;

  @Column({ type: 'int' })
  public currentApprovalOrder: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
