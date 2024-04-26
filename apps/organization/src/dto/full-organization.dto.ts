import { PartialType } from '@nestjs/swagger';
import { UpdateOrganizationDto } from './update-organization.dto';

export class FullOrganizationDto extends PartialType(UpdateOrganizationDto) {
  id?: number;
}
