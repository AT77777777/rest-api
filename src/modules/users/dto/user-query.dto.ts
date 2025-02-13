import { ApiProperty, PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UserQueryDto extends PickType(UserDto, ['name', 'age', 'bio']) {
  @ApiProperty({ required: false })
  'name': string;
  @ApiProperty({ required: false })
  'age': string;
  @ApiProperty({ required: false })
  'bio': string;
}
