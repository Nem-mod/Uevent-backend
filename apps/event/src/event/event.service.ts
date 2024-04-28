import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './interfaces/dto/create-event.dto';
import { IEventRepository } from './interfaces/event.repository.interface';
import { FullEventDto } from './interfaces/dto/full-event.dto';

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

    return await this.getById(newEvent.id);
  }

  async getById(id: number): Promise<FullEventDto> {
    const event: FullEventDto = await this.eventRepository.findOne({
      where: { id: id },
      select: {
        organization: {
          id: true,
        },
      },
      relations: ['organization'],
    });

    if (!event) {
      throw new NotFoundException(`Not found event with id=${id}`);
    }

    return event;
  }
}
