import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from '../../user/entities/user.entity';
import { AutoMap } from '@automapper/classes';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column({ type: 'text' })
  @AutoMap()
  content: string;

  @ManyToOne(() => User, (user) => user.comments  , {onDelete : 'CASCADE'})
  @AutoMap()
  user: User;

  @ManyToOne(() => Post, (post) => post.comments , {onDelete : 'CASCADE'})
  @AutoMap()
  post: Post;

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
