import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '@app/common/database/base/base.typeorm.repository';
import { Format } from '../entities/format.entity';
import { IFormatRepository } from '../interfaces/format.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class FormatRepository
  extends BaseTypeormRepository<Format>
  implements IFormatRepository
{
  constructor(
    @InjectRepository(Format)
    private readonly formatRepository: Repository<Format>,
  ) {
    super(formatRepository);
  }
}
