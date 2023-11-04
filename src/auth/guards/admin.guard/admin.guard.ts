import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 从request中解析出user
    const { user } = context.switchToHttp().getRequest();

    // 我们这个项目 1代表管理员 只有一个
    return user?.id === 1;
  }
}
