import { PickType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class UpdateUserDto extends PickType(UserDto, ['name', 'bio', 'age']) {}
