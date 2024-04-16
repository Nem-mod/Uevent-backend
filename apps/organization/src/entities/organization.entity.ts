import { Column, Entity, Point } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';

@Entity()
export class Organization extends AbstractEntity {
  @Column({ type: 'varchar', length: 200, unique: true })
  name!: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 15, unique: true })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 255 })
  fopIdentifier!: string;

  // @Column({ type: 'geometry' })  TODO: change to Position as FK
  // location: Point;
}
