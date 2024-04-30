import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Ticket } from '../entities/ticket.entity';

export interface ITicketRepository extends IBaseRepository<Ticket> {}
