import { Injectable } from '@nestjs/common';
import { PostEntity } from '../../../database/entities/post.entity';
import { PostDto } from '../dto/post.dto';

@Injectable()
export class PostsMapper {
  public static toResDto(data: PostEntity): PostDto {
    return {
      id: data.id,
      body: data.body,
      created: data.created,
      updated: data.updated,
      userId: data.user_id,
    };
  }
}
