import { Body, Controller, Delete, Get, Patch, Query } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { UserEntity } from '../../database/entities/user.entity';
import { UserSearchQueryDto } from './dto/user-search-query.dto';
import { UserQueryDto } from './dto/user-query.dto';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IUserData } from '../auth/models/interfaces/user-data.interface';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMapper } from './services/user.mapper';

@ApiBearerAuth()
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async findAll(@Query() query: UserQueryDto): Promise<UserDto[]> {
    return await this.usersService.findAll(query);
  }

  @Get('search')
  public async findByIdOrEmail(
    @Query() query: UserSearchQueryDto,
  ): Promise<UserEntity[]> {
    return await this.usersService.findByIdOrEmail(query);
  }

  @Delete('delete')
  public async remove(@CurrentUser() userData: IUserData): Promise<void> {
    await this.usersService.remove(userData);
  }

  @Patch('update')
  public async update(
    @CurrentUser() userData: IUserData,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const result = await this.usersService.update(userData, updateUserDto);
    return UserMapper.toResDto(result);
  }
}
