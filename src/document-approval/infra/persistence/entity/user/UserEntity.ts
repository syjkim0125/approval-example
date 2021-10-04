import { Entity, Column, UpdateDateColumn } from 'typeorm';

import { BaseEntity } from 'src/document-approval/infra/persistence/entity/BaseEntity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column('varchar', { length: 120 })
  public name: string;

  @Column('varchar', { length: 120 })
  public email: string;

  @Column('varchar', { length: 120 })
  public password: string;

  @UpdateDateColumn()
  updatedAt: Date;
}
