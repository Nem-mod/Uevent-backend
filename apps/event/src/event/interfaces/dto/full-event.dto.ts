import { OmitType, PartialType } from '@nestjs/swagger';
import { UpdateEventDto } from './update-event.dto';
import { FullFormatDto } from '../../../format/interfaces/dto/full-format.dto';
import { FullThemeDto } from '../../../theme/interfaces/dto/full-theme.dto';
import { OrganizationDto } from './organization.dto';

export class FullEventDto extends PartialType(
  OmitType(UpdateEventDto, ['organization', 'themes', 'format'] as const),
) {
  id?: number;

  organization: OrganizationDto;
  themes: FullThemeDto[];
  format: FullFormatDto;
}
