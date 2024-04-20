import { IntersectionType, PartialType } from '@nestjs/swagger';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';
import { UpdateUserGatewayDto } from './update.user.gateway.dto';

export class FullUserGatewayDto extends IntersectionType(
  PartialType(UpdateUserGatewayDto),
  PartialType(AbstractEntity),
) {}
