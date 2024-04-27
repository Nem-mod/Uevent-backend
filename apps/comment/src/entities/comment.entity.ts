import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { User } from '../../../user/src/entities/user.entity';
import { Event } from '../../../event/src/event/entities/event.entity';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ type: 'text' })
  text!: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdTime!: Date;

  @ManyToOne(() => Event)
  event: Event;

  @ManyToOne(() => User)
  user: User;
}
