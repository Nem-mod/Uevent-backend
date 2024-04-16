import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventRepository } from './repositories/event.repository';
import { DatabaseModule } from '@app/common/database/database.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { ConfigModule } from '@app/common/config/config.module';
import { Event } from './entities/event.entity';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    DatabaseModule,
    DatabaseModule.forFeature([Event]),
  ],
  controllers: [EventsController],
  providers: [
    EventsService,
    { provide: `IEventRepository`, useClass: EventRepository },
  ],
})
export class EventsModule {}
