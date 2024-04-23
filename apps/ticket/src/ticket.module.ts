import { Module } from '@nestjs/common';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { ConfigModule } from '@app/common/config/config.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { Ticket } from './entities/ticket.entity';
import { TicketRepository } from './repositories/ticket.repository';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Ticket]),
  ],
  controllers: [TicketController],
  providers: [
    TicketService,
    { provide: 'ITicketRepository', useClass: TicketRepository },
  ],
})
export class TicketModule {}
