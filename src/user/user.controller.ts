import { Body, Controller, Get, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user/current-user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponse } from './user.response';
import { UserService } from './user.service';
import { UserPasswordDto } from './dto/password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('current')
  @Auth()
  info(@CurrentUser() user: User) {
    return new UserResponse(user).make();
  }

  @Put('update')
  @Auth()
  async update(@Body() dto: UpdateUserDto, @CurrentUser() user: User) {
    return await this.userService.update(user.id, dto);
  }

  @Put('password')
  @Auth()
  async password(@Body() dto: UserPasswordDto, @CurrentUser() user: User) {
    await this.userService.updatePassword(user.id, dto);
    return {
      message: '密码更新成功',
    };
  }
}
