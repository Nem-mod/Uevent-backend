import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IOrganization } from './interfaces/organization.interface';

@Injectable()
export class OrganizationService {
  constructor(
    @Inject('ORGANIZATION_SERVICE')
    private readonly organizationClient: ClientProxy,
  ) {}

  async register(org: IOrganization): Promise<IOrganization> {
    return await lastValueFrom(
      this.organizationClient
        .send<IOrganization>({ cmd: 'register' }, org)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async delete(orgId: number): Promise<void> {
    this.organizationClient.emit('deleteOrganization', { orgId });
  }

  async getUserOrganizations(userId: number): Promise<IOrganization[]> {
    return await lastValueFrom(
      this.organizationClient
        .send<IOrganization[]>({ cmd: 'list' }, userId)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }
}
