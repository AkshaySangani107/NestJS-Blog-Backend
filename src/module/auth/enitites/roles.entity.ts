import { AutoMap } from '@automapper/classes';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from './permission.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  role: string;

  @AutoMap()
  @OneToMany(() => User, (user) => user.role)
  user: User;

  @AutoMap()
  @ManyToMany(() => Permission, (permission) => permission.role)
  @JoinTable()
  permission: Permission[];

  @CreateDateColumn()
  createdAt: Date;
}
