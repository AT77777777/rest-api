import { Body, Controller, Get } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { IUserData } from '../auth/models/interfaces/user-data.interface';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiBearerAuth()
  @Get()
  public async findAll(@Body() userData: IUserData): Promise<UserDto[]> {
    return await this.usersService.findAll(userData);
  }
}
