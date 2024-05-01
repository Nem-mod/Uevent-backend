import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { IsNumber } from 'class-validator';

export class UpdateEventDto extends PartialType(CreateEventDto) {
    @IsNumber()
    id: number;
}
