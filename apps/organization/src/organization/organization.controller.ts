import { Body, Controller } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { MessagePattern } from '@nestjs/microservices';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { FullOrganizationDto } from './dto/full-organization.dto';

@Controller()
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @MessagePattern({ cmd: 'register' })
  async register(@Body() org: CreateOrganizationDto) {
    return await this.organizationService.register(org);
  }

  // @OrganizationRole('owner')
  // @UseGuards(OrganizationRoleGuard)
  // @MessagePattern({ cmd: 'delete' })
  // async delete(ids: IBaseOrganizationRequest) {
  //   return null;
  // }

  @MessagePattern({ cmd: 'list' })
  async getUserOrganizations(userId: number): Promise<FullOrganizationDto[]> {
    return await this.organizationService.getUserOrganizations(userId);
  }
}
