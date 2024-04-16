import { Controller, Get } from '@nestjs/common';
import { OrganizationService } from './organization.service';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @Get()
  getHello(): string {
    return this.organizationService.getHello();
  }
}
