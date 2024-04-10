import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';

@Entity()
export class Gateway extends AbstractEntity {
  @Column()
  name: string;
}
