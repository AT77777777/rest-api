import { TokenPairResDto } from './token-pair.res.dto';
import { UserDto } from '../../../../users/dto/user.dto';

export class AuthResDto {
  tokens: TokenPairResDto;
  user: UserDto;
  sessionStartedOn: Date;
}
