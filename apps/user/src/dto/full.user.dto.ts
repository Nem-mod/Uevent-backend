import { IntersectionType, PartialType } from '@nestjs/swagger';
import { UpdateUserDto } from './update.user.dto';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';

export class FullUserDto extends IntersectionType(
  PartialType(UpdateUserDto),
  AbstractEntity,
) {}
