import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 复用装饰器
export function Auth() {
  return applyDecorators(UseGuards(AuthGuard('jwt')));
}
