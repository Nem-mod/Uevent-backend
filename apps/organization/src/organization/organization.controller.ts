import { Body, Controller, UseGuards } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { FullOrganizationDto } from './dto/full-organization.dto';
import { IBaseOrganizationRequest } from './interfaces/base.organization.request.interface';
import { OrganizationRoleGuard } from '../role/guards/organization-role.guard';
import { OrganizationRole } from '../role/decorators/organization-role.decorator';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Body() org: CreateOrganizationDto) {
    return await this.organizationService.register(org);
  }

  @OrganizationRole('owner')
  @UseGuards(OrganizationRoleGuard)
  @EventPattern('deleteOrganization')
  async delete(ids: IBaseOrganizationRequest) {
    await this.organizationService.delete(ids.orgId);
  }

  @MessagePattern({ cmd: 'list' })
  async getUserOrganizations(userId: number): Promise<FullOrganizationDto[]> {
    return await this.organizationService.getUserOrganizations(userId);
  }
}
