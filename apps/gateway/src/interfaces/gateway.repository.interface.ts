import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import { Gateway } from '../entities/gateway.entity';

export interface IGatewayRepository extends IBaseRepository<Gateway> {}
