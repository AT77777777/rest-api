import { ConflictException, Injectable } from '@nestjs/common';
import { PostRepository } from '../../repository/services/post.repository';
import { PostEntity } from '../../../database/entities/post.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { CreatePostDto } from '../dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostRepository) {}

  public async findByUser(userId: string): Promise<PostEntity[]> {
    return await this.postRepository.findBy({ user_id: userId });
  }

  public async create(
    userData: IUserData,
    dto: CreatePostDto,
  ): Promise<PostEntity> {
    return await this.postRepository.save(
      this.postRepository.create({ ...dto, user_id: userData.userId }),
    );
  }

  public async remove(userData: IUserData, postId: string): Promise<void> {
    const post = await this.postRepository.findOneBy({
      id: postId,
      user_id: userData.userId,
    });
    if (!post) {
      throw new ConflictException('You can only delete your own posts');
    }
    await this.postRepository.remove(post);
  }

  public async update(
    userData: IUserData,
    postId: string,
    dto: CreatePostDto,
  ): Promise<PostEntity> {
    const post = await this.postRepository.findOneBy({
      id: postId,
      user_id: userData.userId,
    });
    if (!post) {
      throw new ConflictException('You can only update your own posts');
    }
    this.postRepository.merge(post, dto);
    return await this.postRepository.save(post);
  }
}
