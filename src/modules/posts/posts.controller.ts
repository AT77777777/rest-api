import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PostEntity } from '../../database/entities/post.entity';
import { SkipAuth } from '../auth/decorators/skip-auth.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { PostDto } from './dto/post.dto';
import { PostsMapper } from './services/posts.mapper';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @SkipAuth()
  @Get(':userId')
  public async findByUser(
    @Param('userId') userId: string,
  ): Promise<PostEntity[]> {
    return await this.postsService.findByUser(userId);
  }

  @ApiBearerAuth()
  @Post('create')
  public async create(
    @CurrentUser() userData: IUserData,
    @Body() dto: CreatePostDto,
  ): Promise<PostDto> {
    const result = await this.postsService.create(userData, dto);
    return PostsMapper.toResDto(result);
  }

  @ApiBearerAuth()
  @Delete(':postId/delete')
  public async remove(
    @CurrentUser() userData: IUserData,
    @Param('postId', ParseUUIDPipe) postId: string,
  ): Promise<void> {
    await this.postsService.remove(userData, postId);
  }

  @ApiBearerAuth()
  @Patch(':postId/update')
  public async update(
    @CurrentUser() userData: IUserData,
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() dto: CreatePostDto,
  ): Promise<PostDto> {
    const result = await this.postsService.update(userData, postId, dto);
    return PostsMapper.toResDto(result);
  }
}
