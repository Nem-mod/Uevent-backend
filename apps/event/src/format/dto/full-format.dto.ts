import { PartialType } from '@nestjs/swagger';
import { UpdateFormatDto } from './update-format.dto';

export class FullFormatDto extends PartialType(UpdateFormatDto) {
  id?: number;
}
