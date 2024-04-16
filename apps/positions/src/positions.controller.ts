import { Controller, Get } from '@nestjs/common';
import { PositionsService } from './positions.service';

@Controller()
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Get()
  getHello(): string {
    return this.positionsService.getHello();
  }
}
