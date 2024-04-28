import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './interfaces/dto/create-event.dto';
import { IEventRepository } from './interfaces/event.repository.interface';
import { FullEventDto } from './interfaces/dto/full-event.dto';
import { FormatService } from '../format/format.service';
import { ThemeService } from '../theme/theme.service';
import { IEventSearchQuery } from './interfaces/event-search-query.interface';
import { FullFormatDto } from '../format/interfaces/dto/full-format.dto';
import { FullThemeDto } from '../theme/interfaces/dto/full-theme.dto';

@Injectable()
export class EventService {
  constructor(
    @Inject('IEventRepository')
    private readonly eventRepository: IEventRepository,
    private readonly formatService: FormatService,
    private readonly themeService: ThemeService,
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

  async getEvents(
    query: IEventSearchQuery,
  ): Promise<{ data: FullEventDto[]; count: number }> {
    const take = query.offset || 10;
    const skip = query.page * take || 0;
    return await this.eventRepository.findAndCount({
      take: take,
      skip: skip,
      order: { startTime: 'DESC' },
      select: {
        organization: {
          id: true,
        },
      },
      relations: ['organization'],
    });
  }

  async getFormats(): Promise<FullFormatDto[]> {
    return await this.formatService.getAllFormats();
  }

  async getThemes(): Promise<FullThemeDto[]> {
    return await this.themeService.getAllThemes();
  }
}
