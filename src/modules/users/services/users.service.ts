import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/services/user.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserDto } from '../dto/user.dto';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findAll(userData: IUserData): Promise<UserDto[]> {
    return this.userRepository.find();
  }
}
