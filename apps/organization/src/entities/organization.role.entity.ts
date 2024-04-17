import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class OrganizationRole extends AbstractEntity {
  @Column({ type: 'varchar', length: 10, unique: true })
  name: string;
}
