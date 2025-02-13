import { PickType } from '@nestjs/swagger';
import { SignUpReqDto } from './sign-up.req.dto';

export class SignInReqDto extends PickType(SignUpReqDto, [
  'email',
  'password',
]) {}
