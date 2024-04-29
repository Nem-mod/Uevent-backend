import {
  Body,
  Controller,
  Delete,
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
import { IEventSearchQuery } from './interfaces/event-search-query.interface';
import { TicketService } from '../ticket/ticket.service';
import { IEventAndTicketsStatistic } from './interfaces/event-and-tickets-statistic.interface';

@Controller({
  version: '1',
  path: 'event',
})
export class EventController {
  constructor(
    private readonly eventGatewayService: EventService,
    private readonly ticketService: TicketService,
  ) {}

  @Get('formats')
  async getAllFormats() {
    return await this.eventGatewayService.getFormats();
  }

  @Get('themes')
  async getAllThemes() {
    return await this.eventGatewayService.getThemes();
  }
  @Get(':id')
  async getEventById(
    @Param('id', ParseIntPipe) eventId: number,
  ): Promise<IEventAndTicketsStatistic> {
    const event: IEvent = await this.eventGatewayService.getEventById(eventId);
    const ticketsStatistic =
      await this.ticketService.getTicketsStatisticsByEvent(eventId);

    return { ...event, ticketsStatistic };
  }

  @Get()
  async getEvents(@Query() query: IEventSearchQuery) {
    return await this.eventGatewayService.getEvents(query);
  }

  @OrganizationRole('owner', 'moderator')
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

  @OrganizationRole('owner', 'moderator')
  @UseGuards(AccessAuthGuard, OrganizationRoleGuard)
  @Delete(':id')
  async deleteEvent(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.eventGatewayService.deleteEvent(id);
  }
}
