import { Inject, Injectable } from '@nestjs/common';
import { ICreateOrganizationGateway } from './interfaces/create-organization.gateway.interface';
import { IFullOrganizationGateway } from './interfaces/full-organization.gateway.interface';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';

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
      this.organizationClient.send({ cmd: 'register' }, org).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async delete(orgId: number, userId: number) {
    await lastValueFrom(
      this.organizationClient.send({ cmd: 'delete' }, { orgId, userId }).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
