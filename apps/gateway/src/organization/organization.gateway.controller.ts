import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrganizationGatewayService } from './organization.gateway.service';
import { ICreateOrganizationGateway } from './interfaces/create-organization.gateway.interface';
import { IFullOrganizationGateway } from './interfaces/full-organization.gateway.interface';
import { AccessJwtAuthGuard } from '../gateway/guards/access-jwt-auth.guard';
import { IFullUserGateway } from '../user/interfaces/full-user.gateway.interface';
import { ReqUser } from '../gateway/decorators/user.decorator';

@Controller({
  version: '1',
  path: 'org',
})
export class OrganizationGatewayController {
  constructor(
    private readonly organizationGatewayService: OrganizationGatewayService,
  ) {}

  @UseGuards(AccessJwtAuthGuard)
  @Post('register')
  async register(
    @ReqUser() user: IFullUserGateway,
    @Body() org: ICreateOrganizationGateway,
  ): Promise<IFullOrganizationGateway> {
    org.owner = user.id;
    return await this.organizationGatewayService.register(org);
  }

  @UseGuards(AccessJwtAuthGuard)
  @Delete(':id')
  async delete(
    @ReqUser() user: IFullUserGateway,
    @Param('id', ParseIntPipe) orgId: number,
  ) {
    return await this.organizationGatewayService.delete(orgId, user.id);
  }
}
