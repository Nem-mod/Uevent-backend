import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, ManyToMany, ManyToOne, JoinTable } from 'typeorm';
import { Organization } from '../../../../organization/src/organization/entities/organization.entity';
import { Theme } from '../../theme/entities/theme.entity';
import { Format } from '../../format/entities/format.entity';
import { Position } from '../../../../position/src/entities/position.entity';

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

  @Column({
    type: 'varchar',
    length: 200,
    default: 'https://storage.googleapis.com/uevent-bucket/poster.webp',
  })
  poster!: string;

  @ManyToOne(() => Organization, { onDelete: 'SET NULL' })
  organization: Organization;

  @ManyToMany(() => Theme, { eager: true, onDelete: 'CASCADE' })
  @JoinTable()
  themes: Theme[];

  @ManyToOne(() => Format, { eager: true, nullable: true })
  format: Format;

  @ManyToOne(() => Position)
  location: Position;

  @Column({ type: 'varchar', length: 100, nullable: true })
  locationStr: string;
}
