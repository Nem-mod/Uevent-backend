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
import { TicketService } from './ticket.service';
import { ITicketStatistic } from './interfaces/ticket-statistic.interface';
import { ITicketSearchQuery } from './interfaces/ticket-search-query.interface';
import { OrganizationRoleGuard } from '../common/guards/organization-role.guard';
import { AccessAuthGuard } from '../common/guards/access-auth.guard';
import { OrganizationRole } from '../common/decorators/organization-role.decorator';
import { ITicketSearchResponse } from './interfaces/ticket-search-response';
import { IReturnLink } from '../auth/interfaces/return-link.interface';
import { ReqUser } from '../common/decorators/user-request.decorator';
import { IUser } from '../user/interfaces/user.interface';

@Controller({
  version: '1',
  path: 'tickets',
})
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @UseGuards(AccessAuthGuard)
  @Post('event/:id/type/:type/buy')
  async buyAvailableTicket(
    @ReqUser() user: IUser,
    @Param('id', ParseIntPipe) eventId: number,
    @Param('type') type: string,
    @Body() returnLink: IReturnLink,
  ): Promise<string> {
    return await this.ticketService.buyAvailableTicket(
      user.id,
      eventId,
      type,
      returnLink.returnLink,
    );
  }

  @Get('event/:id/stats')
  async getTicketsStatisticByEvent(
    @Param('id', ParseIntPipe) eventId: number,
  ): Promise<ITicketStatistic[]> {
    return this.ticketService.getTicketsStatisticsByEvent(eventId);
  }

  @OrganizationRole('owner', 'moderator')
  @UseGuards(AccessAuthGuard, OrganizationRoleGuard)
  @Get('event/:id')
  async getTicketsByEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Query() query: ITicketSearchQuery,
  ): Promise<ITicketSearchResponse> {
    query.event = eventId;
    return await this.ticketService.getTickets(query);
  }
}
