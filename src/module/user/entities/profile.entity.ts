import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ nullable: true })
  @AutoMap()
  userName: string;

  @Column({ nullable: true })
  @AutoMap()
  bio: string;

  @Column({ nullable: true })
  @AutoMap()
  location: string;

  @Column({type : 'bigint' , nullable: true})
  @AutoMap()
  phone: number;

  @OneToOne(() => User, (user) => user.profile ,{ onDelete: 'CASCADE'})
  @JoinColumn()
  @AutoMap()
  user: User;

  @Column({nullable : true , default : null})
  @AutoMap()
  Profile_url : string

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @DeleteDateColumn()
  @AutoMap()
  deletedAt: Date;

  @UpdateDateColumn()
  @AutoMap()
  updateAt: Date;
}
