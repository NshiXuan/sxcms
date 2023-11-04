import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma.service';
import { POLICY_KEY } from './policy.decorator';

@Injectable()
export class PolicyGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1.获取元数据里面的数据
    const { policy, action } = this.reflector.get<any>(
      POLICY_KEY,
      context.getHandler()
    );
    // 2.获取使用该守卫的方法
    // 获取控制器前面的前缀 作为表名
    const controller = context.getClass().name.replace('Controller', '');
    const method = context.getHandler().name;
    const request = context.switchToHttp().getRequest() as Request;
    const user = (request as any).user as User;

    // 3.如果是超管 直接放行
    if (user.id == 1) return true;

    // 4.根据id获取评论的信息
    const model = await this.prisma[controller].findUnique({
      where: { id: +request.params.id || 0 },
    });

    // 5.初始化commonpolicy实例
    const policyInstance = new policy(this.prisma, request);

    // 6.调用commonpolicy的方法判断是否为作者
    // 为ture 通过 不为true Forbidden403
    return policyInstance[action || method](model, user);
  }
}
