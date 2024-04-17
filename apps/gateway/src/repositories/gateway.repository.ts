import { Injectable } from '@nestjs/common';
import { BaseTypeormRepository } from '@app/common/database/typeorm/base.typeorm.repository';
import { Gateway } from '../entities/gateway.entity';
import { IGatewayRepository } from '../interfaces/gateway.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class GatewayRepository
  extends BaseTypeormRepository<Gateway>
  implements IGatewayRepository
{
  constructor(
    @InjectRepository(Gateway)
    private readonly gatewayRepository: Repository<Gateway>,
  ) {
    super(gatewayRepository);
  }
}
