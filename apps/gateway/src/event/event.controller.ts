import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EventService } from './event.service';
import { IEvent } from './interfaces/event.interface';
import { OrganizationRole } from '../common/decorators/organization-role.decorator';
import { OrganizationRoleGuard } from '../common/guards/organization-role.guard';
import { AccessAuthGuard } from '../common/guards/access-auth.guard';
import { IEventAndTickets } from './interfaces/event-and-tickets.interface';

@Controller({
  version: '1',
  path: 'event',
})
export class EventController {
  constructor(private readonly eventGatewayService: EventService) {}

  @Get(':id')
  async getEventById(
    @Param('id', ParseIntPipe) eventId: number,
  ): Promise<IEvent> {
    return await this.eventGatewayService.getEventById(eventId);
  }

  @Get()
  async getEvents(@Query() query) {
    return await this.eventGatewayService.getEvents(query);
  }

  @OrganizationRole('owner')
  @UseGuards(AccessAuthGuard, OrganizationRoleGuard)
  @Post(':orgId')
  async createEventWithTickets(
    @Param('orgId', ParseIntPipe) orgId: number,
    @Body() eventAndTickets: IEventAndTickets,
  ): Promise<IEvent> {
    return await this.eventGatewayService.createEventWithTickets(
      orgId,
      eventAndTickets,
    );
  }
}
