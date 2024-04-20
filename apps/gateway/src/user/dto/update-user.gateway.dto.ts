import { PartialType } from '@nestjs/swagger';
import { CreateUserGatewayDto } from './create-user.gateway.dto';

export class UpdateUserGatewayDto extends PartialType(CreateUserGatewayDto) {}
