import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import {
  DeepPartial,
  FindManyOptions,
  Repository,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';

export abstract class BaseTypeormRepository<T extends AbstractEntity>
  implements IBaseRepository<T>
{
  constructor(private readonly entity: Repository<T>) {}

  create(data: DeepPartial<T>): T {
    return this.entity.create(data);
  }

  createMany(data: DeepPartial<T>[]): T[] {
    return this.entity.create(data);
  }

  findOne(filter: FindOneOptions<T>): Promise<T> {
    return this.entity.findOne(filter);
  }

  findAll(filter?: FindManyOptions<T>): Promise<T[]> {
    return this.entity.find(filter);
  }

  findOneById(id: number): Promise<T> {
    return this.entity.findOneBy({ id } as FindOptionsWhere<T>);
  }

  preload(data: DeepPartial<T>): Promise<T> {
    return this.entity.preload(data);
  }

  remove(data: T): Promise<T> {
    return this.entity.remove(data);
  }

  removeAll(data: T[]): Promise<T[]> {
    return this.entity.remove(data);
  }

  save(data: T): Promise<T> {
    return this.entity.save(data);
  }

  saveMany(data: T[]): Promise<T[]> {
    return this.entity.save(data);
  }

  async update(id: number, data: T): Promise<T> {
    try {
      const property = await this.findOneById(id);
      data.id = id;
      return this.save(data);
    } catch (err) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }
  }

  delete(filter: FindOptionsWhere<T>): Promise<void> {
    this.entity.delete(filter);
    return;
  }
}
