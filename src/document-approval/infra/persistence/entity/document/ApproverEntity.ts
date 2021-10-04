import { Entity, Column, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from 'src/document-approval/infra/persistence/entity/BaseEntity';

@Entity()
export class ApproverEntity extends BaseEntity {
  @Column('varchar', { length: 120 })
  public userId: string;

  @Column('varchar', { length: 120 })
  public documentId: string;

  @Column({ type: 'int' })
  public approvalOrder: number;

  @UpdateDateColumn()
  updatedAt: Date;
}
