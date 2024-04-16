import { BaseTypeormRepository } from '@app/common/database/base/base.typeorm.repository';
import { Position } from '../entities/position.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPositionRepository } from '../interfaces/position.repository.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PositionRepository
  extends BaseTypeormRepository<Position>
  implements IPositionRepository
{
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>,
  ) {
    super(positionRepository);
  }
}
