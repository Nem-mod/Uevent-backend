import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { Theme } from '../entities/theme.entity';
import { IThemeRepository } from '../interfaces/theme.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ThemeRepository
  extends BaseTypeormRepository<Theme>
  implements IThemeRepository
{
  constructor(
    @InjectRepository(Theme)
    private readonly themeRepository: Repository<Theme>,
  ) {
    super(themeRepository);
  }
}
