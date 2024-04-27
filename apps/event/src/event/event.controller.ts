import { Body, Controller } from '@nestjs/common';
import { EventService } from './event.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateEventDto } from './dto/create-event.dto';
import { FullEventDto } from './dto/full-event.dto';

@Controller()
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @MessagePattern({ cmd: 'create' })
  async create(@Body() event: CreateEventDto): Promise<FullEventDto> {
    // TODO: Check all endpoints for @Body()
    // TODO: Rename startTime to start
    return await this.eventService.create(event);
  }
}
