import { PickType } from '@nestjs/swagger';
import { SignUpReqDto } from '../../auth/models/dto/req/sign-up.req.dto';

export class UserDto extends PickType(SignUpReqDto, ['email', 'name', 'bio']) {
  id: string;
}
