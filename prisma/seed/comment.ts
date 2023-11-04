import { PrismaClient } from '@prisma/client';
import { Random } from 'mockjs';

const prisma = new PrismaClient();

export default async () => {
  for (let i = 1; i < 30; i++) {
    // 评论
    const res = await prisma.comment.create({
      data: {
        content: Random.csentence(),
        user: { connect: { id: i } },
        soft: { connect: { id: i } },
      },
    });

    // 回复
    await prisma.comment.create({
      data: {
        content: Random.csentence(),
        user: { connect: { id: i } },
        soft: { connect: { id: i } },
        reply: {
          connect: { id: res.id },
        },
      },
    });
  }
};
