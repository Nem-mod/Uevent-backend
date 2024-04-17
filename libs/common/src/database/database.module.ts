import { Module } from '@nestjs/common';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { ConnectTypeormModule } from '@app/common/database/typeorm/connect.typeorm.module';

@Module({
  imports: [ConnectTypeormModule],
})
export class DatabaseModule {
  static forFeature(entities: EntityClassOrSchema[]) {
    return ConnectTypeormModule.forFeature(entities);
  }
}
