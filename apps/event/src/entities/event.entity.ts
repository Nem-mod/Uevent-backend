import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Organization } from '../../../organization/src/entities/organization.entity';
import { Theme } from './theme.entity';
import { Format } from './format.entity';
import { Position } from '../../../position/src/entities/position.entity';

@Entity()
export class Event extends AbstractEntity {
  @Column({ type: 'varchar', length: 100 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamptz' })
  startTime!: Date;

  @Column({ type: 'int', nullable: true })
  duration: number;

  @Column({ type: 'varchar', length: 200, default: 'poster.webp' }) // TODO: change default and length
  poster!: string;

  @ManyToOne(() => Organization)
  organization: Organization;

  @ManyToMany(() => Theme, { eager: true })
  @JoinTable()
  themes: Theme[];

  @ManyToOne(() => Format, { eager: true })
  format: Format;

  @ManyToOne(() => Position)
  location: Position;
}
