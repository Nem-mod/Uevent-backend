import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { EventGatewayService } from './event.gateway.service';

@Controller({
    version: '1',
    path: 'event'
})
export class EventGatewayController {
    constructor(
        private readonly eventGatewayService: EventGatewayService
    ) {}

    @Get(':id')
    async getEventById(@Param('id', ParseIntPipe) eventId: number) {
        return await this.eventGatewayService.getEventById(eventId);
    }
}