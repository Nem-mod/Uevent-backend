import { Module } from '@nestjs/common';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { EventRepository } from './event/repositories/event.repository';
import { PgTypeormModule } from '@app/common/database/typeorm/postgres/pg.typeorm.module';
import { LoggerModule } from '@app/common/logger/logger.module';
import { ConfigModule } from '@app/common/config/config.module';
import { Event } from './event/entities/event.entity';
import { FormatService } from './format/format.service';
import { ThemeService } from './theme/theme.service';
import { FormatRepository } from './format/repositories/format.repository';
import { ThemeRepository } from './theme/repositories/theme.repository';
import { Theme } from './theme/entities/theme.entity';
import { Format } from './format/entities/format.entity';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    PgTypeormModule,
    PgTypeormModule.forFeature([Event, Theme, Format]),
  ],
  controllers: [EventController],
  providers: [
    EventService,
    FormatService,
    ThemeService,
    { provide: `IEventRepository`, useClass: EventRepository },
    { provide: `IFormatRepository`, useClass: FormatRepository },
    { provide: `IThemeRepository`, useClass: ThemeRepository },
  ],
})
export class EventModule {}
