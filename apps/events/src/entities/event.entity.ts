import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, Point } from 'typeorm';

@Entity()
export class Event extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'timestamptz' })
  startTime!: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column({ type: 'varchar', length: 200, default: 'poster.webp' }) // TODO: change default and length
  poster!: string;

  @Column({ type: 'geometry' })
  location: Point;
}
