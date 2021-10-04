import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/document-approval/infra/persistence/entity/BaseEntity';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column('varchar', { length: 120 })
  public approverId: string;

  @Column('varchar', { length: 120 })
  public documentId: string;

  @Column('varchar', { length: 120 })
  public content: string;
}
