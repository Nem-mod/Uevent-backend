import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom } from 'rxjs';
import { IFullEventGateway } from '../organization/interfaces/full-event.gateway.interface';

@Injectable()
export class EventGatewayService {
    constructor(
       @Inject('EVENT_SERVICE')
       private readonly eventClient: ClientProxy
    ) {}

    async getEventById(id: number) {
        return await lastValueFrom(
            this.eventClient
                .send<IFullEventGateway>(
                    { cmd: 'getEventById' },
                    { id },
                )
                .pipe(
                    catchError((val) => {
                        throw new RpcException(val);
                    }),
                ),
        );
    }
}