import { Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from './interfaces/dto/create-event.dto';
import { FullEventDto } from './interfaces/dto/full-event.dto';
import { IEventQueryInterface } from './interfaces/event.query.interface';
import { FullFormatDto } from '../format/interfaces/dto/full-format.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({ cmd: 'create' })
  async create(event: CreateEventDto): Promise<FullEventDto> {
    // TODO: Rename startTime to start
    return await this.eventService.create(event);
  }

  @MessagePattern({ cmd: 'getEventById' })
  async getById(id: number): Promise<FullEventDto> {
    return await this.eventService.getById(id);
  }

  @MessagePattern({ cmd: 'getEvents' })
  async getEvents(query: IEventQueryInterface): Promise<{ data: FullEventDto[], count: number}> {
    return await this.eventService.getEvents(query);
  }

  @MessagePattern({ cmd: 'formats' })
  async getFormats(): Promise<FullFormatDto[]> {
    return await this.eventService.getFormats();
  }

  @MessagePattern({ cmd: 'themes' })
  async getThemes(): Promise<FullFormatDto[]> {
    return await this.eventService.getThemes();
  }


}
