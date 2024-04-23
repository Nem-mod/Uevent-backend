import { Module } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { PgConnectTypeormModule } from '@app/common/database/typeorm/postgres/pg.connect.typeorm.module';

@Module({
  imports: [PgConnectTypeormModule],
})
export class PgTypeormModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return PgConnectTypeormModule.forFeature(entities);
  }
}
