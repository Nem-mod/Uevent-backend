import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { Gateway } from '../../../../apps/gateway/src/entities/gateway.entity';
import { User } from '../../../../apps/users/src/entities/user.entity';
import { Event } from '../../../../apps/events/src/entities/event.entity';
import { Organization } from '../../../../apps/organizations/src/entities/organization.entity';
import { Ticket } from '../../../../apps/tickets/src/entities/ticket.entity';
import { Comment } from '../../../../apps/comments/src/entities/comment.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: configService.get(`db.postgres.type`),
        url: configService.get(`db.postgres.uri`),
        synchronize: configService.get('stage') === 'develop',
        entities: [Gateway, User, Event, Organization, Ticket, Comment],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return TypeOrmModule.forFeature(entities);
  }
}
