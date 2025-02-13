import { UserEntity } from '../../../database/entities/user.entity';
import { UserDto } from '../dto/user.dto';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { IJwtPayload } from '../../auth/models/interfaces/jwt-payload.interface';

export class UserMapper {
  public static toResDto(user: UserEntity): UserDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      age: user.age,
    };
  }

  public static toIUserData(
    user: UserEntity,
    jwtPayload: IJwtPayload,
  ): IUserData {
    return {
      userId: user.id,
      email: user.email,
    };
  }
}
