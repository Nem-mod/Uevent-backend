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
import { OrganizationGatewayService } from './organization.gateway.service';
import { ICreateOrganizationGateway } from './interfaces/create-organization.gateway.interface';
import { IFullOrganizationGateway } from './interfaces/full-organization.gateway.interface';
import { AccessJwtAuthGuard } from '../gateway/guards/access-jwt-auth.guard';
import { IFullUserGateway } from '../user/interfaces/full-user.gateway.interface';
import { ReqUser } from '../gateway/decorators/user.decorator';
import { ICreateEventGateway } from './interfaces/create-event.gateway.interface';
import { IFullEventGateway } from './interfaces/full-event.gateway.interface';
import { IOrgIdAndUserId } from './interfaces/org-id-and-user-id.interface';

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
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @ReqUser() user: IFullUserGateway,
    @Param('id', ParseIntPipe) orgId: number,
  ): Promise<void> {
    await this.organizationGatewayService.delete(orgId, user.id);
  }

  @UseGuards(AccessJwtAuthGuard)
  @Get()
  async getUserOrganizations(
    @ReqUser() user: IFullUserGateway,
  ): Promise<IFullOrganizationGateway[]> {
    return await this.organizationGatewayService.getUserOrganizations(user.id);
  }

  @UseGuards(AccessJwtAuthGuard)
  @Post(':id/event')
  async createEvent(
    @ReqUser() user: IFullUserGateway,
    @Param('id', ParseIntPipe) orgId: number,
    @Body() event: ICreateEventGateway,
  ): Promise<IFullEventGateway> {
    const orgAndUserIds: IOrgIdAndUserId = {
      userId: user.id,
      orgId,
    };

    return await this.organizationGatewayService.createEvent(
      orgAndUserIds,
      event,
    );
  }
}
