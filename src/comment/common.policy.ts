import { Comment, User } from '@prisma/client';
import { Request } from 'express';
import { PrismaService } from 'src/common/prisma.service';
import { IPolicy } from 'src/policy/policy.decorator';

export class CommentPolicy implements IPolicy {
  constructor(private prisma: PrismaService, private request: Request) {}

  // 该方法名称默认与调用@Policy()的方法名称相同 为了方便守卫调用
  remove(model: Comment, user: User) {
    // 如果当前评论的用户id与user id相同 说明为作者
    return model.userId == user.id;
  }

  // 如果@Policy()有第二个参数，则定义相同的方法，为了方便守卫调用 如下test
  test() {
    return true;
  }
}
