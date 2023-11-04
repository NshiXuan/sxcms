import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/common/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto, user: User, sid: number) {
    const { commentId, ...dto } = createCommentDto;

    return this.prisma.comment.create({
      data: {
        ...dto,
        user: { connect: { id: user.id } },
        soft: { connect: { id: +sid } },
        reply: commentId && { connect: { id: +commentId } }, // commentId存在就用后面的表达式 不存在为undefined
      },
      include: { replys: true, user: true },
    });
  }

  async findAll(sid: number) {
    return this.prisma.comment.findMany({
      where: {
        softId: sid,
        AND: [{ commentId: null }],
      },
      include: {
        user: true,
        replys: { include: { user: true } },
      },
    });
  }

  remove(id: number) {
    return this.prisma.comment.deleteMany({
      where: {
        id: +id,
      },
    });
  }
}
