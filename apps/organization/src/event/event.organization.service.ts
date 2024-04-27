import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { IFullEvent } from './interfaces/full-event.interface';
import { catchError, lastValueFrom } from 'rxjs';
import { ICreateEventOrganizationRequest } from '../organization/interfaces/create-event.organization.request.interface';

@Injectable()
export class EventOrganizationService {
  constructor(
    @Inject('EVENT_SERVICE') private readonly eventClient: ClientProxy,
  ) {}

  async createEvent(
    idsAndEvent: ICreateEventOrganizationRequest,
  ): Promise<IFullEvent> {
    idsAndEvent.event.organization = idsAndEvent.orgId;

    return await lastValueFrom(
      this.eventClient
        .send<IFullEvent>({ cmd: 'create' }, idsAndEvent.event)
        .pipe(
          catchError((val) => {
            throw new RpcException(val);
          }),
        ),
    );
  }
}
