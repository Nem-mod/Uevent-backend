import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Event } from '../../../event/src/event/entities/event.entity';

@Entity()
export class Ticket extends AbstractEntity {
  @Column({ type: 'int' })
  cost!: number;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'bool', default: false })
  composted!: boolean;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  dateScanned: Date;

  @ManyToOne(() => Event)
  event: Event;
}
