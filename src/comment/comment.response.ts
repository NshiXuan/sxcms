import { Comment, User } from '@prisma/client';
import { JsonResponse } from 'src/core/json.response';
import { UserResponse } from 'src/user/user.response';

// CommentResponse 继承 JsonResponse 类中的所有属性和方法
export class CommentResponse extends JsonResponse<
  Comment & {
    user: User;
    replys: Comment[];
  }
> {
  // 重写make
  public make(): any {
    super.make();

    // 去除password
    this.data.user = new UserResponse(this.data.user).make();

    if (this.data.replys) {
      this.data.replys = this.data.replys?.map((reply) =>
        new CommentResponse(reply as any).make()
      );
    }

    return this.data;
  }
}
