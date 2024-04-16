import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { Column, Entity, Index, Point } from 'typeorm';

@Entity()
export class Position extends AbstractEntity {
  @Index({ spatial: true })
  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  point: Point;

  @Column({ type: 'varchar', length: 100 })
  address: string;
} //TODO: Add functions to work with spatial data
