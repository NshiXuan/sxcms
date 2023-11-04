import { User } from '@prisma/client';
import { JsonResponse } from 'src/core/json.response';

// UserResponse 继承 JsonResponse 类中的所有属性和方法
export class UserResponse extends JsonResponse<User> {
  // 重写hidden
  protected hidden: (keyof User)[] = ['password', 'secret'];

  // 重写make
  public make(): User {
    super.make();

    this.data.avatar = this.data.avatar || '/public/assets/avatar.png';

    // data为JsonResponse中的data
    return this.data;
  }
}
