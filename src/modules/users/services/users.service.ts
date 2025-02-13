import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../repository/services/user.repository';
import { RefreshTokenRepository } from '../../repository/services/refresh-token.repository';
import { UserDto } from '../dto/user.dto';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { ApiQuery } from '@nestjs/swagger';
import { UserSearchQueryDto } from '../dto/user-search-query.dto';
import { UserEntity } from '../../../database/entities/user.entity';
import { UserQueryDto } from '../dto/user-query.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly refreshTokenRepository: RefreshTokenRepository,
  ) {}

  public async findAll(query: UserQueryDto): Promise<UserDto[]> {
    return await this.userRepository.findBy(query);
  }

  public async findByIdOrEmail(
    query: UserSearchQueryDto,
  ): Promise<UserEntity[]> {
    if (query.id || query.email) {
      return await this.userRepository.findBy(query);
    }
  }

  public async remove(userData: IUserData): Promise<void> {
    await this.userRepository.delete({ id: userData.userId });
    await this.refreshTokenRepository.delete({ user_id: userData.userId });
  }

  public async update(
    userData: IUserData,
    dto: UpdateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id: userData.userId });
    this.userRepository.merge(user, dto);
    return await this.userRepository.save(user);
  }
}
