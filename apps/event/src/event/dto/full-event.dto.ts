import { OmitType, PartialType } from '@nestjs/swagger';
import { UpdateEventDto } from './update-event.dto';
import { FullFormatDto } from '../../format/dto/full-format.dto';
import { FullThemeDto } from '../../theme/dto/full-theme.dto';
import { IId } from '../interfaces/id.interface';

export class FullEventDto extends PartialType(
  OmitType(UpdateEventDto, ['organization', 'themes', 'format'] as const),
) {
  id?: number;

  organization: IId;
  themes: FullThemeDto[];
  format: FullFormatDto;
}
