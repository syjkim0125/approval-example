import { Entity, Column } from 'typeorm';

import { BaseEntity } from 'src/document-approval/infra/persistence/entity/BaseEntity';

@Entity()
export class ApplicantEntity extends BaseEntity {
  @Column('varchar', { length: 120 })
  public userId: string;

  @Column('varchar', { length: 120 })
  public documentId: string;
}
