import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Event } from '../entities/event.entity';

export interface IEventRepository extends IBaseRepository<Event> {}
