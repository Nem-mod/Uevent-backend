import { Controller } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreateOrganizationDto } from './interfaces/dto/create-organization.dto';
import { FullOrganizationDto } from './interfaces/dto/full-organization.dto';
import { IOrgIdAndUserId } from './interfaces/org-id-and-user-id.interface';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @MessagePattern({ cmd: 'register' })
  async register(org: CreateOrganizationDto): Promise<FullOrganizationDto> {
    return await this.organizationService.register(org);
  }

  @MessagePattern({ cmd: 'getUserRolesInOrganization' })
  async getUserRolesInOrganization(ids: IOrgIdAndUserId): Promise<string[]> {
    return await this.organizationService.getUserRolesInOrganization(ids);
  }

  @EventPattern('deleteOrganization')
  async delete(orgId: number): Promise<void> {
    await this.organizationService.delete(orgId);
  }

  @MessagePattern({ cmd: 'list' })
  async getUserOrganizations(userId: number): Promise<FullOrganizationDto[]> {
    return await this.organizationService.getUserOrganizations(userId);
  }
}
