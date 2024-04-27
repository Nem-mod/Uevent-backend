import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Theme extends AbstractEntity {
  @Column({ type: 'varchar', length: 20, unique: true })
  name: string;
}
