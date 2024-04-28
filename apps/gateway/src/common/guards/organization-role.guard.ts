import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { catchError, lastValueFrom } from 'rxjs';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class OrganizationRoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('ORGANIZATION_SERVICE')
    private readonly organizationClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>(
      'orgRoles',
      context.getHandler(),
    );

    if (!roles) return true;

    const req = context.switchToHttp().getRequest();
    console.log(req.user, req.params.orgId);
    const userId = req.user.id;
    const orgId = req.params.orgId;

    const userRoles = await lastValueFrom(
      this.organizationClient
        .send({ cmd: 'getUserRolesInOrganization' }, { orgId, userId })
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );

    if (!roles.some((role) => userRoles.includes(role)))
      throw new ForbiddenException(
        'You have no permission to perform this operation on organization',
      );

    return true;
  }
}
