import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { hash, verify } from 'argon2';
import { LoginDto } from './dto/login.dto';
import { validateFail } from 'src/helper';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private jwt: JwtService
  ) {}

  async register(dto: RegisterDto) {
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
      },
    });

    return this.token(user);
  }

  async login(dto: LoginDto) {
    // 1.验证用户
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ name: dto.name }, { email: dto.name }, { mobile: dto.name }],
      },
    });

    if (!user) {
      validateFail('name', '账号不存在');
    }

    // 2.验证密码
    if (!(await verify(user.password, dto.password))) {
      return new BadRequestException();
    }

    return this.token(user);
  }

  private token(user: User) {
    return {
      token: this.jwt.sign({ id: user.id }),
    };
  }
}
