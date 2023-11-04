import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/common/prisma.service';
import { UserPasswordDto } from './dto/password.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // 更新用户基本信息
  async update(id: number, dto: UpdateUserDto) {
    await this.prisma.user.update({
      where: { id },
      data: { ...dto },
    });

    return {
      message: '更新成功',
    };
  }

  // 更新密码
  async updatePassword(id: number, dto: UserPasswordDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: await hash(dto.password),
      },
    });
  }
}
