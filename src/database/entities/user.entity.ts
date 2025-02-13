import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { PostEntity } from './post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false, unique: true })
  email: string;

  @Column('text', { select: false, nullable: false })
  password: string;

  @Column('text', { nullable: true })
  name: string;

  @Column('text', { nullable: true })
  bio: string;

  @Column('text', { nullable: true })
  age: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refreshTokens?: RefreshTokenEntity[];

  @OneToMany(() => PostEntity, (entity) => entity.user)
  posts?: PostEntity[];
}
