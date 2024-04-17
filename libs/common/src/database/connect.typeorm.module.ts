import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Gateway } from '../../../../apps/gateway/src/entities/gateway.entity';
import { User } from '../../../../apps/user/src/entities/user.entity';
import { Event } from '../../../../apps/event/src/entities/event.entity';
import { Organization } from '../../../../apps/organization/src/entities/organization.entity';
import { Ticket } from '../../../../apps/ticket/src/entities/ticket.entity';
import { Comment } from '../../../../apps/comment/src/entities/comment.entity';
import { OrganizationMember } from '../../../../apps/organization/src/entities/organization.member.entity';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ConfigModule } from '@app/common/config/config.module';
import { Position } from '../../../../apps/position/src/entities/position.entity';
import { Format } from '../../../../apps/event/src/entities/format.entity';
import { Theme } from '../../../../apps/event/src/entities/theme.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: configService.get(`db.postgres.type`),
        url: configService.get(`db.postgres.uri`),
        synchronize: configService.get('stage') === 'develop',
        entities: [
          Gateway,
          User,
          Event,
          Organization,
          OrganizationMember,
          Ticket,
          Comment,
          Position,
          Format,
          Theme,
        ],
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [TypeOrmModule],
})
export class ConnectTypeormModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
