import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from 'src/common/config.service';
import { PrismaService } from 'src/common/prisma.service';

// 记得使用这个装饰器 不然不会注入constructor中的参数
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService, private prisma: PrismaService) {
    // 分析完后会提取到用户的id放到下面的validate中
    // 如果token是无效的会自动抛出异常
    super({
      // 解析提交的Bearer Token header数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 加密的token密钥
      secretOrKey: configService.get('app_key'),
    });
  }

  // 验证通过后解析用户资料
  async validate({ id }): Promise<User> {
    const user = this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    // user会放在request对象里面;
    return user;
  }
}
