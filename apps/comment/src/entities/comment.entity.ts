import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';

@Entity()
export class Comment extends AbstractEntity {
  @Column({ type: 'text' })
  text!: string;

  @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createdTime: Date;
}
