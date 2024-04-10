import { Column, Entity } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Gateway {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
