import { DeepPartial } from 'typeorm';

export interface IBaseRepository<T> {
  create(data: DeepPartial<T>): T;
  createMany(data: DeepPartial<T>[]): T[];
  delete(filter: any): Promise<void>;
  save(data: T): Promise<T>;
  saveMany(data: T[]): Promise<T[]>;
  findOneById(id: number | string): Promise<T>;
  findOne(filter: any): Promise<T>;
  findAll(filter?: any): Promise<T[]>;
  remove(data: T): Promise<T>;
  removeAll(data: T[]): Promise<T[]>;
  update(id: number | string, data: DeepPartial<T>): Promise<T>;
  preload(data: DeepPartial<T>): Promise<T>;
}
