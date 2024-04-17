import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEventRepository } from '../interfaces/event.repository.interface';
import { Event } from '../entities/event.entity';

@Injectable()
export class EventRepository
  extends BaseTypeormRepository<Event>
  implements IEventRepository
{
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {
    super(eventRepository);
  }
}
