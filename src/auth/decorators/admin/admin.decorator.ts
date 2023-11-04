import { applyDecorators, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from 'src/auth/guards/admin.guard/admin.guard';

// 复用装饰器
export function Admin() {
  return applyDecorators(UseGuards(AuthGuard('jwt'), AdminGuard));
}
