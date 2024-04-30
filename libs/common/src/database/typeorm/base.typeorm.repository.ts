import { IBaseRepository } from '@app/common/database/base/base.repository.interface';
import {
  DeepPartial,
  FindManyOptions,
  Repository,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
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

  async findAndCount(filter?: any): Promise<{ data: T[]; count: number }> {
    const [result, total] = await this.entity.findAndCount(filter);

    return {
      data: result,
      count: total,
    };
  }

  async findOneById(id: number): Promise<T> {
    return await this.entity.findOneBy({ id } as FindOptionsWhere<T>);
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

  async update(id: number, data: DeepPartial<T>): Promise<T> {
    if (!(await this.findOneById(id))) return null;
    await this.entity.save({ ...data, id } as any);
    return await this.findOneById(id);
  }

  async delete(filter: FindOptionsWhere<T>): Promise<void> {
    await this.entity.delete(filter);
  }

  createQueryBuilder(alias?: string): any {
    return this.entity.createQueryBuilder(alias);
  }
}
