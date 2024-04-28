import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { IOrganization } from './interfaces/organization.interface';
import { ReqUser } from '../common/decorators/user-request.decorator';
import { AccessAuthGuard } from '../common/guards/access-auth.guard';
import { IUser } from '../user/interfaces/user.interface';
import { OrganizationRole } from '../common/decorators/organization-role.decorator';
import { OrganizationRoleGuard } from '../common/guards/organization-role.guard';

@Controller({
  version: '1',
  path: 'org',
})
export class OrganizationController {
  constructor(private readonly organizationService: OrganizationService) {}

  @UseGuards(AccessAuthGuard)
  @Post('register')
  async register(
    @ReqUser() user: IUser,
    @Body() org: IOrganization,
  ): Promise<IOrganization> {
    org.owner = user.id;
    return await this.organizationService.register(org);
  }

  @OrganizationRole('owner')
  @UseGuards(AccessAuthGuard, OrganizationRoleGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseIntPipe) orgId: number): Promise<void> {
    await this.organizationService.delete(orgId);
  }

  @UseGuards(AccessAuthGuard)
  @Get()
  async getUserOrganizations(@ReqUser() user: IUser): Promise<IOrganization[]> {
    return await this.organizationService.getUserOrganizations(user.id);
  }
}
