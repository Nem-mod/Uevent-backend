import { CreateFormatDto } from './create-format.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateFormatDto extends PartialType(CreateFormatDto) {}
