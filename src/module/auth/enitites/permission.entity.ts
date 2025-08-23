import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.entity';

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  Permission_type: string;

  @AutoMap()
  @ManyToMany(() => Roles, (role) => role.permission)
  role: Roles[];
}
