import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// 创建参数装饰器
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  }
);
