import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePostDto {
  @ApiProperty({ example: 'Post Body' })
  @IsString()
  @IsNotEmpty()
  @Length(0, 3000)
  @Type(() => String)
  body: string;
}
