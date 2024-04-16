import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Position } from '../entities/position.entity';

export interface IPositionRepository extends IBaseRepository<Position> {}
