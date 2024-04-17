import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;
}
