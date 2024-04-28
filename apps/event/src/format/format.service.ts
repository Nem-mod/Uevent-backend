import { Inject, Injectable } from '@nestjs/common';
import { FormatRepository } from './repositories/format.repository';

@Injectable()
export class FormatService {
    constructor(
       @Inject('IFormatRepository')
       private readonly formatRepository: FormatRepository
    ) {}
}
