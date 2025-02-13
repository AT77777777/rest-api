import { ApiProperty, PickType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class PostDto extends PickType(CreatePostDto, ['body']) {
  @ApiProperty({
    example: '86b6d785-04ba-4965-b08b-83b413c4e906',
    description: 'Post ID',
  })
  id: string;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Created Date',
  })
  created: Date;

  @ApiProperty({
    example: '2021-09-29T10:00:00.000Z',
    description: 'Article Updated Date',
  })
  updated: Date;

  @ApiProperty({
    example: '6552c4b3-24ed-4896-bcfe-c0ae88437875',
    description: 'User ID',
  })
  userId: string;
}
