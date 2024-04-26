import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { OrganizationMemberService } from '../../member/organization-member.service';

@Injectable()
export class OrganizationRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly organizationMemberService: OrganizationMemberService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      'orgRoles',
      context.getHandler(),
    );

    if (!roles) return true;

    const req = context.switchToRpc().getData();
    const userId = req.userId;
    const orgId = req.orgId;

    const userRoles =
      await this.organizationMemberService.getUserRolesInOrganization(
        orgId,
        userId,
      );

    if (!roles.some((role) => userRoles.includes(role)))
      throw new ForbiddenException(
        'You have no permission to perform this operation on organization',
      );

    return true;
  }
}
