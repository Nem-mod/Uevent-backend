import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from './interfaces/dto/create-event.dto';
import { FullEventDto } from './interfaces/dto/full-event.dto';
import { FullFormatDto } from '../format/interfaces/dto/full-format.dto';
import { IEventSearchQuery } from './interfaces/dto/event-search-query.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({ cmd: 'create' })
  async create(event: CreateEventDto): Promise<FullEventDto> {
    // TODO: Rename startTime to start
    return await this.eventService.create(event);
  }

  @EventPattern('deleteEvent')
  async delete(id: number): Promise<void> {
    await this.eventService.delete(id);
  }

  @MessagePattern({ cmd: 'getEventById' })
  async getById(id: number): Promise<FullEventDto> {
    return await this.eventService.getById(id);
  }

  @MessagePattern({ cmd: 'getEvents' })
  async getEvents(
    query: IEventSearchQuery,
  ): Promise<{ data: FullEventDto[]; count: number }> {
    // TODO: create interface for this
    // TODO: implement filtration by organization
    return await this.eventService.getEvents(query);
  }

  @MessagePattern({ cmd: 'getAllFormats' })
  async getFormats(): Promise<FullFormatDto[]> {
    return await this.eventService.getFormats();
  }

  @MessagePattern({ cmd: 'getAllThemes' })
  async getThemes(): Promise<FullFormatDto[]> {
    return await this.eventService.getThemes();
  }
}
