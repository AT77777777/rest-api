import { IsOptional } from 'class-validator';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserSearchQueryDto extends PickType(UserDto, ['id', 'email']) {
  @ApiProperty({ required: false })
  @IsOptional()
  'id': string;
  @ApiProperty({ required: false })
  @IsOptional()
  'email': string;
}
