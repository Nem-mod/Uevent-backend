import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '@app/common/database/base/base.typeorm.repository';
import { ITicketRepository } from '../interfaces/ticket.repository.interface';
import { Ticket } from '../entities/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TicketRepository
  extends BaseTypeormRepository<Ticket>
  implements ITicketRepository
{
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {
    super(ticketRepository);
  }
}
