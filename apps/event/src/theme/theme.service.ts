import { Inject, Injectable } from '@nestjs/common';
import { ThemeRepository } from './repositories/theme.repository';

@Injectable()
export class ThemeService {
    constructor(
        @Inject('IThemeRepository')
        private readonly themeRepository: ThemeRepository
    ) {}
}
