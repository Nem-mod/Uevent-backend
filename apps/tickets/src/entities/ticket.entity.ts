import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Ticket extends AbstractEntity {
  @Column({ type: 'int' })
  cost!: number;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'bool', default: false })
  composted!: boolean;

  @Column({ type: 'timestamptz', default: null })
  dataScanned: Date;
}
