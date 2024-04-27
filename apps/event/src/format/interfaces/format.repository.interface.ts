import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Format } from '../entities/format.entity';

export interface IFormatRepository extends IBaseRepository<Format> {}
