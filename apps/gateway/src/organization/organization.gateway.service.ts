import { Inject, Injectable } from '@nestjs/common';
import { ICreateOrganizationGateway } from './interfaces/create-organization.gateway.interface';
import { IFullOrganizationGateway } from './interfaces/full-organization.gateway.interface';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IOrgIdAndUserId } from './interfaces/org-id-and-user-id.interface';
import { ICreateEventGateway } from './interfaces/create-event.gateway.interface';
import { IFullEventGateway } from './interfaces/full-event.gateway.interface';

@Injectable()
export class OrganizationGatewayService {
  constructor(
    @Inject('ORGANIZATION_SERVICE')
    private readonly organizationClient: ClientProxy,
  ) {}

  async register(
    org: ICreateOrganizationGateway,
  ): Promise<IFullOrganizationGateway> {
    return await lastValueFrom(
      this.organizationClient
        .send<IFullOrganizationGateway>({ cmd: 'register' }, org)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async delete(orgId: number, userId: number): Promise<void> {
    this.organizationClient.emit('deleteOrganization', { orgId, userId });
  }

  async getUserOrganizations(
    userId: number,
  ): Promise<IFullOrganizationGateway[]> {
    return await lastValueFrom(
      this.organizationClient
        .send<IFullOrganizationGateway[]>({ cmd: 'list' }, userId)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }

  async createEvent(
    orgAndUserIds: IOrgIdAndUserId,
    event: ICreateEventGateway,
  ): Promise<IFullEventGateway> {
    return await lastValueFrom(
      this.organizationClient
        .send<IFullEventGateway>(
          { cmd: 'createEvent' },
          { ...orgAndUserIds, event },
        )
        .pipe(
            catchError((val) => {
                throw new RpcException(val);
            }),
        ),
    );
  }
}
