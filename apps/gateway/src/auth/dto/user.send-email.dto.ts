import { IntersectionType } from '@nestjs/swagger';
import { ReturnUrlDto } from './return-url.dto';
import { UserIdDto } from './user-id.dto';

export class UserSendEmailDto extends IntersectionType(
  ReturnUrlDto,
  UserIdDto,
) {}
