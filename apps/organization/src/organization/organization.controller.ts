import { Body, Controller, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationRoleGuard } from '../role/guards/organization-role.guard';
import { OrganizationRole } from '../role/decorators/organization-role.decorator';
import { IBaseOrganizationRequest } from './interfaces/base.organization.request.interface';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Body() org: CreateOrganizationDto) {
    return await this.organizationService.register(org);
  }

  @OrganizationRole('owner')
  @UseGuards(OrganizationRoleGuard)
  @MessagePattern({ cmd: 'delete' })
  async delete(ids: IBaseOrganizationRequest) {
    return null;
  }
}
