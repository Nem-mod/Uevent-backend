import { Module } from '@nestjs/common';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventRepository } from './repositories/event.repository';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { ConfigModule } from '@app/common/config/config.module';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Event]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    { provide: `IEventRepository`, useClass: EventRepository },
  ],
})
export class EventModule {}
