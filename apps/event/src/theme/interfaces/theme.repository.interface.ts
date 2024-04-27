import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Theme } from '../entities/theme.entity';

export interface IThemeRepository extends IBaseRepository<Theme> {}
