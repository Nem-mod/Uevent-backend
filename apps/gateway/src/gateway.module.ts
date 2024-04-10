import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { GatewayController } from './gateway.controller';
import { GatewayRepository } from './repositories/gateway.repository';
import { IGatewayRepository } from './interfaces/gateway.repository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gateway } from './entities/gateway.entity';
import { DatabaseModule } from '@app/common/database/database.module';
import { ConfigModule } from '@app/common/config/config.module';

@Module({
  imports: [DatabaseModule, ConfigModule, DatabaseModule.forFeature([Gateway])],
  providers: [
    GatewayService,
    { provide: `IGatewayRepository`, useClass: GatewayRepository },
  ],
  controllers: [GatewayController],
})
export class GatewayModule {}
