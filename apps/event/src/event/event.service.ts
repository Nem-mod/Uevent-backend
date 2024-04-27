import { Inject, Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { IEventRepository } from './interfaces/event.repository.interface';
import { FullEventDto } from './dto/full-event.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
  ) {}

  async create(event: CreateEventDto): Promise<FullEventDto> {
    const organization = { id: event.organization };
    const themes = event.themes.map((themeId) => ({ id: themeId }));
    const format = { id: event.format }; // TODO: add error handling for violating foreign key

    const newEvent: FullEventDto = await this.eventRepository.save(
      this.eventRepository.create({
        ...event,
        organization,
        themes,
        format,
      }),
    );

    return await this.eventRepository.findOne({
      where: { id: newEvent.id },
      select: {
        organization: {
          id: true,
        },
      },
      relations: ['organization'],
    });
  }
}
