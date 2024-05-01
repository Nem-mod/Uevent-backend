import { Module } from '@nestjs/common';
import { TicketController } from './ticket/ticket.controller';
import { TicketService } from './ticket/ticket.service';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { TicketRepository } from './ticket/repositories/ticket.repository';
import { Ticket } from './ticket/entities/ticket.entity';
import {
  ClientsModule,
  MicroserviceOptions,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { TokenService } from './token/token.service';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Ticket]),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: 'TOKEN_SERVICE',
        useFactory: async (configService: ConfigService) => {
          return {
            transport:
              Transport[
                configService.get('services.token.transport') as keyof Transport
              ],
            options: configService.get(
              'services.token.options',
            ) as MicroserviceOptions,
          };
        },
      },
    ]),
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    TokenService,
    { provide: 'ITicketRepository', useClass: TicketRepository },
  ],
})
export class TicketModule {}
