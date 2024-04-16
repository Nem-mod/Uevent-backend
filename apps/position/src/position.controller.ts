import { Controller, Get } from '@nestjs/common';
import { PositionService } from './position.service';

@Controller()
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get()
  getHello(): string {
    return this.positionService.getHello();
  }
}
