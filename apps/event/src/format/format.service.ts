import { Inject, Injectable } from '@nestjs/common';
import { FormatRepository } from './repositories/format.repository';
import { FullFormatDto } from './interfaces/dto/full-format.dto';

@Injectable()
export class FormatService {
    constructor(
       @Inject('IFormatRepository')
       private readonly formatRepository: FormatRepository
    ) {}

    async getAllFormats(): Promise<FullFormatDto[]> {
        return await this.formatRepository.findAll();
    }
}
