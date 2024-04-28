import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IEvent } from './interfaces/event.interface';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventClient: ClientProxy,
  ) {}

  async getEventById(id: number): Promise<IEvent> {
    return await lastValueFrom(
      this.eventClient.send<IEvent>({ cmd: 'getEventById' }, { id }).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }

  async createEvent(orgId: number, event: IEvent): Promise<IEvent> {
    event.organization = orgId;

    return await lastValueFrom(
      this.eventClient.send<IEvent>({ cmd: 'create' }, event).pipe(
        catchError((val) => {
          throw new RpcException(val);
        }),
      ),
    );
  }
}
