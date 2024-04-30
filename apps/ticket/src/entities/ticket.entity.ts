import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Event } from '../../../event/src/event/entities/event.entity';
import { User } from '../../../user/src/entities/user.entity';

@Entity()
export class Ticket extends AbstractEntity {
  @Column({ type: 'int' })
  cost!: number;

  @Column({ type: 'varchar', length: 20 })
  type!: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'bool', default: false })
  composted!: boolean;

  @Column({ type: 'timestamptz', default: null, nullable: true })
  dateScanned: Date;

  @Column({ type: 'bool', default: false })
  sold: boolean;

  @ManyToOne(() => Event, { onDelete: 'SET NULL' })
  event: Event;

  @ManyToOne(() => User, { onDelete: 'CASCADE', nullable: true })
  user: User;

  @RelationId((ticket: Ticket) => ticket.user)
  userId: number;

  @RelationId((ticket: Ticket) => ticket.event) // TODO: add RelationIds everywhere
  eventId: number;
}
