import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { User } from '../../../../user/src/entities/user.entity';
import { Event } from '../../../../event/src/event/entities/event.entity';
import { TicketStatus } from '../interfaces/enums/ticket-status.enum';

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
  dateComposted: Date;

  @Column({ type: 'bool', default: false })
  sold: boolean;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.AVAILABLE })
  status: TicketStatus;

  @ManyToOne(() => Event, { onDelete: 'SET NULL' })
  event: Event;

  @ManyToOne(() => User, { onDelete: 'NO ACTION', nullable: true })
  user: User;

  @RelationId((ticket: Ticket) => ticket.user)
  userId: number;

  @RelationId((ticket: Ticket) => ticket.event) // TODO: add RelationIds everywhere
  eventId: number;

  // @AfterUpdate()
  // updateStatus() {
  //   console.log('in afterUpdate');
  //   console.log(this.status);
  //   this.status = TicketStatus.AVAILABLE;
  //   if (this.userId) this.status = TicketStatus.PROCESSING;
  //   if (this.sold) this.status = TicketStatus.SOLD;
  //   if (this.composted) this.status = TicketStatus.COMPOSTED;
  //   console.log(this.status);
  // }
}
