import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { AutoMap } from '@automapper/classes';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id: number;

  @Column()
  @AutoMap()
  public_id: string;

  @Column()
  @AutoMap()
  url: string;

  @CreateDateColumn()
  @AutoMap()
  createdAt: Date;

  @UpdateDateColumn()
  @AutoMap()
  updatedAt: Date;

  @DeleteDateColumn()
  @AutoMap()
  deletedAt: Date;

  @ManyToOne(() => Post, (post) => post.images)
  @AutoMap()
  post_id: Post;
}
