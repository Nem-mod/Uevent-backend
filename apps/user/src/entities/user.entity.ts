import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '@app/common/database/base/base.abstract.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ type: 'varchar', length: 40 }) // TODO: chech "nullable" option
  username!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 72 })
  password!: string;
}
