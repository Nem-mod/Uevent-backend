import { Inject, Injectable } from '@nestjs/common';
import { CreateGatewayDto } from './dto/create-gateway.dto';
import { UpdateGatewayDto } from './dto/update-gateway.dto';
import { IGatewayRepository } from './interfaces/gateway.repository.interface';
import { Gateway } from './entities/gateway.entity';

@Injectable()
export class GatewayService {
  constructor(
    @Inject(`IGatewayRepository`)
    private readonly gatewayRepository: IGatewayRepository,
  ) {}

  create(createGatewayDto: CreateGatewayDto): Promise<Gateway> {
    return this.gatewayRepository.save(
      this.gatewayRepository.create(createGatewayDto),
    );
  }

  findAll(): Promise<Gateway[]> {
    return this.gatewayRepository.findAll();
  }

  findOne(id: number): Promise<Gateway> {
    return this.gatewayRepository.findOneById(id);
  }

  update(id: number, updateGatewayDto: UpdateGatewayDto) {
    return this.gatewayRepository.update(id, updateGatewayDto);
  }

  delete(id: number) {
    return this.gatewayRepository.delete(id);
  }
}
